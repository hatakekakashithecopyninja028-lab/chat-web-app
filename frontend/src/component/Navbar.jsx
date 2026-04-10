import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, MessageCircle, Settings, LogOut, Home, CheckCheck } from 'lucide-react';
import { useAuthStore } from '../store/authstore';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {  authUser , logout } = useAuthStore();  

function loggingout(){logout()}
  const location = useLocation();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Profile', path: '/profile', icon: User },
   
    { name: 'Settings', path: '/setting', icon: Settings },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'backdrop-blur-xl bg-slate-900/80 shadow-2xl shadow-purple-500/10' 
        : 'bg-transparent'
    } border-b border-white/10`}>
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br bg-gray-500 rounded-2xl backdrop-blur-sm shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r. text-white bg-clip-text text-transparent hidden lg:block">
              Aoo Saheli Chugli Kree
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 relative group ${
                    location.pathname === item.path ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 ring-2 ring-purple-500/30' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden lg:block">{item.name}</span>
                  {location.pathname === item.path && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {authUser ? (
              <div className="flex items-center gap-2 md:gap-4">
                <Link to="/profile" className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl backdrop-blur-sm shadow-lg shadow-indigo-500/25 hover:scale-110 transition-all duration-300 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </Link>
                <div className="hidden md:flex flex-col items-end text-sm">
                  <span className="text-white font-bold text-xl truncate max-w-24">{authUser.fullName || 'User'}</span>
                  <span className="text-white text-xs">Welcome back</span>
                </div>
                <button  onClick={loggingout} className="md:hidden p-2 text-slate-400 hover:text-red-400 transition-colors ">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link
                  to="/login"
                  className="px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-xl bg-slate-900/95 border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-2 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-4 rounded-2xl text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300 ${
                    location.pathname === item.path ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 ring-2 ring-purple-500/30 font-semibold' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-6 h-6" />
                  {item.name}
                </Link>
              );
            })}
            {authUser ? (
              <div className="pt-4 border-t border-white/10">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 text-white font-semibold"
                >
                  <User className="w-6 h-6" />
                  Profile
                </Link>
                <button className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300">
                  <LogOut className="w-6 h-6" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-white/10 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

