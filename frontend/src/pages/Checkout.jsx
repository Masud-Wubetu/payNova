import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Loader2, ShieldCheck, CreditCard, User, Mail, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CheckoutForm = ({ clientSecret, product, customerInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: customerInfo.name,
                    email: customerInfo.email,
                },
            },
        });

        if (result.error) {
            setError(result.error.message);
            setProcessing(false);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                navigate('/success');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#1a2a6c',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }} />
            </div>

            {error && <div className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}

            <button
                disabled={processing || !stripe}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {processing ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                    <>
                        <Lock className="w-5 h-5" />
                        Pay ${product.price}
                    </>
                )}
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                <ShieldCheck className="w-4 h-4" />
                <span>Encrypted and Secure Payment Processing</span>
            </div>
        </form>
    );
};

const Checkout = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [step, setStep] = useState(1); // 1: Info, 2: Payment
    const [customerInfo, setCustomerInfo] = useState({ name: '', email: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/products/${productId}`);
                setProduct(res.data.data);
            } catch (err) {
                console.error("Error fetching product", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleInfoSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`/api/checkout/${productId}`, customerInfo);
            setClientSecret(res.data.data.clientSecret);
            setStripePromise(loadStripe(res.data.data.stripePublicKey));
            setStep(2);
        } catch (err) {
            console.error("Error initiating checkout", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && step === 1) return (
        <div className="h-96 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Checkout Summary */}
                <div className="lg:w-1/2">
                    <h2 className="text-2xl font-bold text-primary mb-8">Checkout Summary</h2>
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm sticky top-24">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100">
                                <img src={product?.imageUrl || 'https://via.placeholder.com/80'} alt={product?.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-primary text-lg">{product?.name}</h3>
                                <p className="text-slate-500 text-sm line-clamp-1">{product?.description}</p>
                            </div>
                        </div>

                        <div className="space-y-4 border-t border-slate-100 pt-6">
                            <div className="flex justify-between font-medium text-slate-500">
                                <span>Subtotal</span>
                                <span>${product?.price}</span>
                            </div>
                            <div className="flex justify-between font-medium text-slate-500">
                                <span>Tax</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-primary pt-4 border-t border-dashed border-slate-200">
                                <span>Total</span>
                                <span>${product?.price}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Checkout Form */}
                <div className="lg:w-1/2">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl"
                            >
                                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                                    <User className="w-6 h-6 text-secondary" />
                                    Your Information
                                </h2>
                                <form onSubmit={handleInfoSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                            <input
                                                required
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                value={customerInfo.name}
                                                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                                            <input
                                                required
                                                type="email"
                                                placeholder="john@example.com"
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                                value={customerInfo.email}
                                                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/95 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                                    >
                                        Continue to Payment
                                        <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl"
                            >
                                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                                    <CreditCard className="w-6 h-6 text-secondary" />
                                    Payment Details
                                </h2>
                                {stripePromise && (
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm
                                            clientSecret={clientSecret}
                                            product={product}
                                            customerInfo={customerInfo}
                                        />
                                    </Elements>
                                )}
                                <button
                                    onClick={() => setStep(1)}
                                    className="w-full mt-4 text-slate-500 font-medium hover:text-primary transition-colors text-sm"
                                >
                                    Edit your information
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
