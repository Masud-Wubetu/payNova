import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Key, Loader2, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error'
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            await axios.post('/api/auth/forgotpassword', { email });
            setStatus('success');
        } catch (err) {
            setErrorMsg(err.response?.data?.error || 'Failed to send reset link.');
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-24 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 lg:p-12"
            >
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Key className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-primary mb-2">Reset Password</h1>
                    <p className="text-slate-500">We'll send a demo reset link to your email</p>
                </div>

                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-8"
                        >
                            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-12 h-12" />
                            </div>
                            <h2 className="text-2xl font-bold text-primary mb-2">Check Your Email</h2>
                            <p className="text-slate-500 mb-8">
                                A reset link has been sent to <strong>{email}</strong>. In this demo, also check the backend console!
                            </p>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Login
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >
                            {status === 'error' && (
                                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-start gap-3 text-sm font-medium">
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    {errorMsg}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        required
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary/95 transition-all shadow-xl shadow-primary/30 disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        Send Reset Link
                                    </>
                                )}
                            </button>

                            <div className="text-center">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-medium transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Login
                                </Link>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
