import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowRight, ShieldCheck, Database, Zap, Users, Globe,
    BarChart3, Star, Mail, Phone, MapPin, Send, Loader2, CheckCircle,
    Facebook, Twitter, Github, Linkedin, MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [contactLoading, setContactLoading] = useState(false);
    const [contactSubmitted, setContactSubmitted] = useState(false);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setContactLoading(true);
        setTimeout(() => {
            setContactLoading(false);
            setContactSubmitted(true);
            setContactForm({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <div className="overflow-hidden scroll-smooth">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary/50 to-accent/30 opacity-80"></div>

                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10 py-12 lg:py-0">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 text-white text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-accent font-bold text-sm mb-6 border border-white/20">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                                </span>
                                Now Supporting Local Currencies
                            </div>
                            <h1 className="text-5xl lg:text-8xl font-black mb-6 leading-[1.1] tracking-tighter">
                                Scale Faster with <span className="text-accent underline decoration-8 decoration-accent/30 underline-offset-[12px]">payNova</span>
                            </h1>
                            <p className="text-xl opacity-80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                The ultimate payment gateway integration. Experience 99.9% uptime and enterprise-grade security for your global transactions.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <Link to="/products" className="bg-white text-primary px-8 py-5 rounded-2xl font-black text-lg flex items-center gap-2 hover:bg-accent hover:text-white transition-all shadow-2xl shadow-black/20 group scale-100 hover:scale-[1.05] active:scale-[0.98]">
                                    Browse Store <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <a href="#features" className="bg-transparent border-2 border-white/30 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                                    How it Works
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, type: "spring" }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="bg-white p-5 rounded-[2.5rem] shadow-2xl shadow-black/40 rotate-1 group animate-float border-[12px] border-white/10">
                                <img
                                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                                    alt="POS Terminal"
                                    className="rounded-[1.5rem] w-full h-[400px] object-cover"
                                />
                                <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 hidden md:block">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Recent Payment</div>
                                            <div className="text-lg font-black text-primary">$1,240.00</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-white py-16 lg:py-24 border-b border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
                        {[
                            { label: "Active Merchants", val: "12,000+", icon: <Users className="w-5 h-5 text-accent" /> },
                            { label: "Global Reach", val: "180+", icon: <Globe className="w-5 h-5 text-accent" /> },
                            { label: "Volume Processed", val: "$2.4B", icon: <BarChart3 className="w-5 h-5 text-accent" /> },
                            { label: "Payment APIs", val: "24+", icon: <Zap className="w-5 h-5 text-accent" /> }
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    {s.icon}
                                    <span className="text-lg lg:text-xl text-slate-400 font-bold uppercase tracking-tighter">{s.label}</span>
                                </div>
                                <div className="text-4xl lg:text-5xl font-black text-primary tracking-trough">{s.val}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Expanded */}
            <section id="features" className="py-24 bg-slate-50/50 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-secondary font-black uppercase tracking-[0.2em] text-sm mb-4">Features</h2>
                        <h3 className="text-4xl lg:text-5xl font-black text-primary mb-6 leading-tight">Everything you need to capture more revenue</h3>
                        <p className="text-slate-500 text-lg">Powerful tools designed to help you handle payments, subscriptions, and payouts without breaking a sweat.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="w-8 h-8 text-primary" />,
                                title: "Instant Invoicing",
                                desc: "Create and send professional invoices in seconds. Get paid faster with integrated checkout links."
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                                title: "Smart Fraud Detection",
                                desc: "Advanced machine learning to identify and block fraudulent transactions before they happen."
                            },
                            {
                                icon: <Globe className="w-8 h-8 text-primary" />,
                                title: "Cross-Border Payouts",
                                desc: "Transfer funds to partners and vendors worldwide in their preferred local currency."
                            },
                            {
                                icon: <Database className="w-8 h-8 text-primary" />,
                                title: "Detailed Analytics",
                                desc: "Comprehensive dashboards that show exactly where your money is coming from and where it's going."
                            },
                            {
                                icon: <Users className="w-8 h-8 text-primary" />,
                                title: "Customer Portal",
                                desc: "Give your users a dedicated space to manage their payment methods and view billing history."
                            },
                            {
                                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                                title: "PCI Compliance",
                                desc: "Rest easy knowing your data is stored in Tier 1 data centers with full SOC2 and PCI-DSS compliance."
                            }
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="p-8 lg:p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:bg-primary/[0.02] transition-all group"
                            >
                                <div className="bg-slate-50 p-4 rounded-2xl inline-block mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                                    {f.icon}
                                </div>
                                <h3 className="text-2xl font-black text-primary mb-4">{f.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-primary text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/3">
                            <h2 className="text-accent font-black uppercase tracking-[0.2em] text-sm mb-4">Feedback</h2>
                            <h3 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">Word on the street.</h3>
                            <button className="flex items-center gap-2 font-black text-lg text-accent hover:gap-4 transition-all group">
                                Read all 1,200 reviews <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="lg:w-2/3 grid md:grid-cols-2 gap-6">
                            {[
                                { name: "Sarah Jenkins", role: "CEO @ TechFlow", text: "Moving to payNova was the best decision for our checkout conversion. Simple API, beautiful dashboard." },
                                { name: "David Chen", role: "Founder @ Orbit", text: "The fraud detection alone saved us over $12k in the first month. An absolute game changer for high-volume stores." }
                            ].map((t, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-xl p-8 lg:p-10 rounded-[2.5rem] border border-white/10 relative shadow-2xl">
                                    <Star className="w-8 h-8 text-accent fill-accent mb-6" />
                                    <p className="text-xl font-medium mb-8 opacity-90 leading-relaxed italic">"{t.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                                        <div>
                                            <div className="font-black text-lg">{t.name}</div>
                                            <div className="text-sm opacity-60 font-bold">{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section Integrated */}
            <section id="contact" className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-secondary font-black uppercase tracking-[0.2em] text-sm mb-4">Contact</h2>
                        <h3 className="text-4xl lg:text-5xl font-black text-primary mb-6">Let's talk business</h3>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 bg-slate-50 rounded-[3rem] shadow-sm overflow-hidden border border-slate-100">
                        <div className="lg:w-2/5 bg-primary p-12 text-white flex flex-col justify-between">
                            <div>
                                <h4 className="text-3xl font-black mb-10">Get in touch</h4>
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6">
                                        <Mail className="w-6 h-6 text-accent" />
                                        <div className="font-bold">hello@paynova.com</div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <Phone className="w-6 h-6 text-accent" />
                                        <div className="font-bold">+1 (800) PAY-NOVA</div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <MapPin className="w-6 h-6 text-accent" />
                                        <div className="font-bold">San Francisco, CA</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 flex gap-4 text-white/40">
                                <Facebook className="w-6 h-6 hover:text-accent cursor-pointer transition-colors" />
                                <Twitter className="w-6 h-6 hover:text-accent cursor-pointer transition-colors" />
                                <Github className="w-6 h-6 hover:text-accent cursor-pointer transition-colors" />
                                <Linkedin className="w-6 h-6 hover:text-accent cursor-pointer transition-colors" />
                            </div>
                        </div>

                        <div className="lg:w-3/5 p-12">
                            <AnimatePresence mode="wait">
                                {contactSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center py-12"
                                    >
                                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle className="w-12 h-12" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-primary mb-2">Message Sent!</h2>
                                        <p className="text-slate-500 mb-8">We'll get back to you within 24 hours.</p>
                                        <button
                                            onClick={() => setContactSubmitted(false)}
                                            className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/95 transition-all shadow-lg shadow-primary/20"
                                        >
                                            Send Another
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleContactSubmit} className="space-y-6">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-black text-primary mb-2 uppercase tracking-widest">Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none"
                                                    value={contactForm.name}
                                                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-black text-primary mb-2 uppercase tracking-widest">Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none"
                                                    value={contactForm.email}
                                                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-black text-primary mb-2 uppercase tracking-widest">Message</label>
                                            <textarea
                                                required
                                                rows={5}
                                                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                                                value={contactForm.message}
                                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                            />
                                        </div>
                                        <button
                                            disabled={contactLoading}
                                            className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-primary/95 transition-all shadow-xl shadow-primary/30 active:scale-[0.98]"
                                        >
                                            {contactLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Send Message <ArrowRight className="w-5 h-5" /></>}
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-2 lg:col-span-1">
                            <Link to="/" className="flex items-center gap-2 mb-6">
                                <Zap className="w-8 h-8 text-primary fill-primary" />
                                <span className="text-3xl font-black text-primary tracking-tighter">payNova</span>
                            </Link>
                            <p className="text-slate-500 font-medium mb-8 max-w-xs">Connecting the world through secure, fast, and transparent payment infrastructure.</p>
                            <div className="flex gap-4">
                                <Facebook className="w-5 h-5 text-slate-400 hover:text-primary transition-colors cursor-pointer" />
                                <Twitter className="w-5 h-5 text-slate-400 hover:text-primary transition-colors cursor-pointer" />
                                <Github className="w-5 h-5 text-slate-400 hover:text-primary transition-colors cursor-pointer" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-primary font-black uppercase text-sm mb-6 tracking-widest">Product</h4>
                            <ul className="space-y-4 text-slate-500 font-bold text-sm">
                                <li><Link to="/products" className="hover:text-primary">Demo Store</Link></li>
                                <li><a href="#features" className="hover:text-primary">Features</a></li>
                                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                                <li><a href="#" className="hover:text-primary">Status</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-primary font-black uppercase text-sm mb-6 tracking-widest">Solutions</h4>
                            <ul className="space-y-4 text-slate-500 font-bold text-sm">
                                <li><a href="#" className="hover:text-primary">Ecommerce</a></li>
                                <li><a href="#" className="hover:text-primary">SaaS</a></li>
                                <li><a href="#" className="hover:text-primary">Marketplaces</a></li>
                                <li><a href="#" className="hover:text-primary">Freelancers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-primary font-black uppercase text-sm mb-6 tracking-widest">Support</h4>
                            <ul className="space-y-4 text-slate-500 font-bold text-sm">
                                <li><Link to="/contact" className="hover:text-primary">Help Center</Link></li>
                                <li><a href="#" className="hover:text-primary">API Docs</a></li>
                                <li><a href="#" className="hover:text-primary">Security</a></li>
                                <li><a href="#" className="hover:text-primary">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm font-bold">
                        <div>© 2026 payNova Inc. All rights reserved.</div>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-primary">Terms</a>
                            <a href="#" className="hover:text-primary">Privacy</a>
                            <a href="#" className="hover:text-primary">Cookies</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;

