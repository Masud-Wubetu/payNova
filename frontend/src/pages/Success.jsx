import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Success = () => {
    const [searchParams] = useSearchParams();
    const paymentIntentId = searchParams.get('payment_intent');

    useEffect(() => {
        if (paymentIntentId) {
            const confirmPayment = async () => {
                try {
                    await axios.post(`/api/payments/update/${paymentIntentId}`, { status: 'succeeded' });
                } catch (err) {
                    console.error("Error confirming payment status:", err);
                }
            };
            confirmPayment();
        }
    }, [paymentIntentId]);

    return (
        <div className="container mx-auto px-4 py-24 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-12 text-center"
            >
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <CheckCircle className="w-14 h-14" />
                </div>

                <h1 className="text-4xl font-bold text-primary mb-4">Payment Successful!</h1>
                <p className="text-slate-500 text-lg mb-10">
                    Thank you for your purchase. Your payment has been processed securely.
                    A confirmation email will be sent to your inbox shortly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 py-4 bg-slate-100 text-primary font-bold rounded-2xl hover:bg-slate-200 transition-all"
                    >
                        <Home className="w-5 h-5" />
                        Home
                    </Link>
                    <Link
                        to="/products"
                        className="flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/95 shadow-lg shadow-primary/20 transition-all group"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Keep Shopping
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Success;
