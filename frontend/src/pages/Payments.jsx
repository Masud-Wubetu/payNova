import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, History, CreditCard, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await axios.get('/api/payments');
                setPayments(res.data.data);
            } catch (err) {
                console.error("Error fetching payments", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    if (loading) return (
        <div className="h-96 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="flex items-center gap-4 mb-12">
                <div className="bg-secondary/10 p-3 rounded-2xl">
                    <History className="w-8 h-8 text-secondary" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-primary mb-1">Payment History</h1>
                    <p className="text-slate-500">Overview of all transactions processed via payNova.</p>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 font-bold uppercase text-xs tracking-wider border-b border-slate-100">
                                <th className="px-8 py-6">Customer</th>
                                <th className="px-8 py-6">Description</th>
                                <th className="px-8 py-6 text-center">Amount</th>
                                <th className="px-8 py-6 text-center">Status</th>
                                <th className="px-8 py-6 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {payments.map((payment, i) => (
                                <motion.tr
                                    key={payment._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-slate-50/50 transition-colors group"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {payment.customer?.name?.[0] || 'U'}
                                            </div>
                                            <div>
                                                <div className="font-bold text-primary">{payment.customer?.name}</div>
                                                <div className="text-xs text-slate-400">{payment.customer?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm text-slate-600 line-clamp-1">{payment.description}</div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="font-bold text-primary">${payment.amount}</span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold ring-1 ring-green-200 capitalize">
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="text-sm text-slate-400">
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {payments.length === 0 && (
                    <div className="py-24 text-center">
                        <CreditCard className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-medium">No transactions found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payments;
