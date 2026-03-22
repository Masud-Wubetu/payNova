import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, ArrowLeft, ShieldCheck, Truck, RotateCcw, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/products/${id}`);
                setProduct(res.data.data);
            } catch (err) {
                console.error("Error fetching product", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        setDeleting(true);
        try {
            await axios.delete(`/api/products/${id}`);
            navigate('/products');
        } catch (err) {
            console.error("Error deleting product", err);
            alert("Failed to delete product.");
            setDeleting(false);
        }
    };

    if (loading) return (
        <div className="h-96 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
    );

    if (!product) return (
        <div className="container mx-auto px-4 py-24 text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Product Not Found</h2>
            <Link to="/products" className="text-secondary hover:underline">Back to Store</Link>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Store</span>
                </Link>

                <div className="flex gap-4">
                    <Link
                        to={`/products/edit/${id}`}
                        className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-accent/10 hover:text-accent transition-all shadow-sm"
                        title="Edit Product"
                    >
                        <Edit className="w-5 h-5" />
                    </Link>
                    <button
                        onClick={handleDelete}
                        disabled={deleting}
                        className="p-3 bg-slate-100 text-slate-600 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm disabled:opacity-50"
                        title="Delete Product"
                    >
                        {deleting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-1/2 relative bg-slate-50 p-8 lg:p-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10"
                        >
                            <img
                                src={product.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                                }}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col">
                        <div className="mb-2 text-secondary font-bold tracking-widest uppercase text-sm">Premium Listing</div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-4xl font-bold text-primary">${product.price}</span>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">In Stock</span>
                        </div>

                        <p className="text-slate-600 text-lg leading-relaxed mb-10 flex-grow">{product.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-10 text-sm font-medium">
                            <div className="flex items-center gap-3 text-slate-500 bg-slate-50 p-4 rounded-2xl">
                                <Truck className="w-5 h-5 text-primary" />
                                <span>Free Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-500 bg-slate-50 p-4 rounded-2xl">
                                <RotateCcw className="w-5 h-5 text-primary" />
                                <span>30 Day Return</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(`/checkout/${product._id}`)}
                            className="bg-primary text-white py-5 rounded-2xl font-bold text-xl hover:bg-primary/95 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-[0.98]"
                        >
                            <ShieldCheck className="w-6 h-6" />
                            Secure Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
