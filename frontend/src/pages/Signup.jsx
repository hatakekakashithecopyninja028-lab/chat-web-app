import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react';
import Skeleton from '../component/Skeleton';
import { useAuthStore } from '../store/authstore';
import toast from 'react-hot-toast';



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
    const { signup, isSigningUp } = useAuthStore();


  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',

  });
const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
   
   
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900/20 to-black p-4 lg:p-8 gap-6 lg:gap-12 w-full relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl animate-ping"></div>
      </div>

      <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 p-4 lg:p-8 bg-slate-900/60 border-white/20 rounded-4xl shadow-2xl shadow-purple-500/10 transform hover:scale-[1.02] transition-all duration-500">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r text-white bg-clip-text text-transparent mb-2">
            Join Us Today
          </h1>
          <p className="text-white text-lg">Create your account and start chatting</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Username */}
           <label className="left-12 top-1/2 -translate-y-1/2 text-sm text-white/80 transition-all duration-300 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:text-xs pointer-events-none z-10 ">
              Full Name
            </label>
          <div className="relative">
           
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white h-5 w-5 z-20 pointer-events-none" />
            <input
              type="text"
              name="fullName"
              placeholder=" Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full h-14 pl-12 pr-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300 peer"
            />
          </div>

          {/* Email */}
           <label className=" left-12 top-1/2 -translate-y-1/2 text-sm text-white/80 transition-all duration-300 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:text-xs pointer-events-none z-10  px-2">
              Email Address
            </label>
          <div className="relative">
           
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white h-5 w-5 z-20 pointer-events-none" />
            <input
              type="email"
              name="email"
              placeholder="your@gmail.com "
              value={formData.email}
              onChange={handleInputChange}
              className="w-full h-14 pl-12 pr-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 peer"
            />
          </div>
<label className="  -translate-y-1/2 text-md text-white transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-indigo-400 peer-placeholder-shown:translate-y-0 peer-focus:scale-75">
              Password
            </label>
          {/* Password */}
          <div className="relative">
           
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white h-5 w-5 z-20 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="..... "
              value={formData.password}
              onChange={handleInputChange}
              className="w-full h-14 pl-12 pr-12 bg-white/10 border border-white/20 rounded-2xl text-white transition-all duration-300 peer"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-400 transition-colors z-30"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

         
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full px-8 min-h-[48px] relative z-20 shadow-lg hover:shadow-indigo-500/25 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold rounded-2xl backdrop-blur-sm touch-manipulation pointer-events-auto active:opacity-90 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
          </button>
        </form>

        {/* Link to Login */}
        <div className="mt-8 text-center">
          <p className="text-white">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="relative z-20 inline-block px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600 text-white hover:text-indigo-200 font-semibold rounded-lg touch-manipulation pointer-events-auto transition-all duration-300 active:opacity-90 min-h-[44px] flex items-center"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
      {/* left side section */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center min-h-[70vh] p-4 lg:p-8">
        <Skeleton/>
      </div>
    </div>
  );
};

export default Signup;

