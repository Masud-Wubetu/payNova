import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, Loader2, CheckCircle, AlertCircle, DollarSign, Image, Tag, FileText, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', price: '', description: '', imageUrl: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/products/${id}`);
                const p = res.data.data;
                setForm({
                    name: p.name,
                    price: p.price.toString(),
                    description: p.description,
                    imageUrl: p.imageUrl || ''
                });
            } catch (err) {
                console.error("Error fetching product", err);
                setErrorMsg("Could not load product data.");
                setStatus('error');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setStatus(null);
        try {
            await axios.put(`/api/products/${id}`, {
                ...form,
                price: parseFloat(form.price),
            });
            setStatus('success');
            setTimeout(() => navigate(`/products/${id}`), 1500);
        } catch (err) {
            setErrorMsg(err.response?.data?.error || 'Failed to update product.');
            setStatus('error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="h-96 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-primary mb-8 group transition-colors"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
            </button>

            <div className="flex items-center gap-4 mb-10">
                <div className="bg-accent/10 p-3 rounded-2xl">
                    <Tag className="w-8 h-8 text-accent" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-primary mb-1">Edit Product</h1>
                    <p className="text-slate-500">Update product details in store and Stripe.</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 lg:p-10"
            >
                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-16 text-center"
                        >
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold text-primary mb-2">Changes Saved!</h2>
                            <p className="text-slate-500">Returning to product details…</p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                                <div className="relative">
                                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        required
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Price (USD)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        required
                                        name="price"
                                        type="number"
                                        min="0.50"
                                        step="0.01"
                                        value={form.price}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                                <div className="relative mb-4">
                                    <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        name="imageUrl"
                                        type="url"
                                        value={form.imageUrl}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                {form.imageUrl && (
                                    <div className="relative w-full h-40 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center">
                                        <img
                                            src={form.imageUrl}
                                            alt="Preview"
                                            className="h-full w-full object-contain"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                                            }}
                                        />
                                        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            Live Preview
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                                    <textarea
                                        required
                                        name="description"
                                        rows={4}
                                        value={form.description}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 p-4 rounded-xl text-sm font-medium">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    {errorMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {saving ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Update Product
                                    </>
                                )}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default EditProduct;
