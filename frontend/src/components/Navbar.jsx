import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, ShoppingBag, History, PackagePlus, MessageSquare, User, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary p-2 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                        <CreditCard className="text-white w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-primary tracking-tighter">payNova</span>
                </Link>

                <div className="hidden md:flex gap-8 items-center">
                    <Link to="/products" className="flex items-center gap-1 text-slate-600 hover:text-primary transition-colors font-bold text-sm">
                        <ShoppingBag className="w-4 h-4" />
                        <span>Store</span>
                    </Link>
                    <Link to="/payments" className="flex items-center gap-1 text-slate-600 hover:text-primary transition-colors font-bold text-sm">
                        <History className="w-4 h-4" />
                        <span>History</span>
                    </Link>
                    <Link to="/products/new" className="flex items-center gap-1 text-slate-600 hover:text-primary transition-colors font-bold text-sm">
                        <PackagePlus className="w-4 h-4" />
                        <span>Add Product</span>
                    </Link>
                    <a href="/#contact" className="flex items-center gap-1 text-slate-600 hover:text-primary transition-colors font-bold text-sm">
                        <MessageSquare className="w-4 h-4" />
                        <span>Contact</span>
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end leading-tight">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Auth User</span>
                                <span className="text-sm font-black text-primary">{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-slate-100 p-2.5 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-500 transition-all shadow-sm group"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/login"
                                className="hidden sm:block text-slate-600 font-bold text-sm px-4 py-2 hover:bg-slate-50 rounded-xl transition-all"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-primary/95 transition-all shadow-lg shadow-primary/20"
                            >
                                Join Now
                            </Link>
                        </div>
                    )}
                    <button className="md:hidden bg-slate-100 p-2 rounded-xl text-primary">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

