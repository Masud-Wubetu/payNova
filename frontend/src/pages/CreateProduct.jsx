import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PackagePlus, Loader2, CheckCircle, AlertCircle, DollarSign, Image, Tag, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', price: '', description: '', imageUrl: '' });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);
        try {
            await axios.post('/api/products', {
                ...form,
                price: parseFloat(form.price),
            });
            setStatus('success');
            setTimeout(() => navigate('/products'), 1800);
        } catch (err) {
            setErrorMsg(err.response?.data?.error || 'Failed to create product. Please try again.');
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { name: 'name', label: 'Product Name', type: 'text', placeholder: 'e.g. Premium Headphones', icon: <Tag className="w-5 h-5" /> },
        { name: 'price', label: 'Price (USD)', type: 'number', placeholder: 'e.g. 49.99', icon: <DollarSign className="w-5 h-5" /> },
        { name: 'imageUrl', label: 'Image URL', type: 'url', placeholder: 'https://...', icon: <Image className="w-5 h-5" />, required: false },
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <div className="bg-primary/10 p-3 rounded-2xl">
                    <PackagePlus className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-primary mb-1">Add Product</h1>
                    <p className="text-slate-500">Create a new listing in the store and Stripe.</p>
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
                            <h2 className="text-2xl font-bold text-primary mb-2">Product Created!</h2>
                            <p className="text-slate-500">Redirecting you to the store…</p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {fields.map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">
                                        {field.label}
                                        {field.required === false && (
                                            <span className="ml-2 text-xs font-normal text-slate-400">(optional)</span>
                                        )}
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            {field.icon}
                                        </span>
                                        <input
                                            required={field.required !== false}
                                            name={field.name}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            value={form[field.name]}
                                            onChange={handleChange}
                                            min={field.type === 'number' ? '0.01' : undefined}
                                            step={field.type === 'number' ? '0.01' : undefined}
                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                                    <textarea
                                        required
                                        name="description"
                                        placeholder="Describe the product…"
                                        value={form.description}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            {/* Image preview */}
                            {form.imageUrl && (
                                <div className="rounded-2xl overflow-hidden border border-slate-200 h-48">
                                    <img
                                        src={form.imageUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 p-4 rounded-xl text-sm font-medium">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    {errorMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        <PackagePlus className="w-5 h-5" />
                                        Create Product
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

export default CreateProduct;
