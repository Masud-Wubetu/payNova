import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, Plus, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('/api/products');
                setProducts(res.data.data);
            } catch (err) {
                console.error("Error fetching products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return (
        <div className="h-96 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-primary mb-2">Available Products</h1>
                    <p className="text-slate-500">Pick the perfect solution for your needs.</p>
                </div>
                <div className="hidden md:block">
                    <div className="text-sm font-medium text-slate-400 mb-1">Items found</div>
                    <div className="text-2xl font-bold text-primary">{products.length}</div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col"
                    >
                        <div className="h-64 overflow-hidden relative group">
                            <img
                                src={product.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                                }}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-primary shadow-sm">
                                ${product.price}
                            </div>
                        </div>

                        <div className="p-6 flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-primary mb-2 line-clamp-1">{product.name}</h3>
                            <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-grow">{product.description}</p>

                            <Link
                                to={`/products/${product._id}`}
                                className="w-full bg-slate-100 text-primary py-3 rounded-xl font-bold text-center hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group"
                            >
                                View Details
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

            {products.length === 0 && (
                <div className="py-24 text-center">
                    <ShoppingCart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <p className="text-slate-400 font-medium text-lg mb-4">No products yet.</p>
                    <Link
                        to="/products/new"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        <Plus className="w-4 h-4" /> Add First Product
                    </Link>
                </div>
            )}
        </div>
    );
};

// Internal ArrowRight for the mapping
const ArrowRight = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
);

export default ProductList;
