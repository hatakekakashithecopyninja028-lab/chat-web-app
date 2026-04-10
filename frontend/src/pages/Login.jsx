import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import Skeleton from '../component/Skeleton';
import { useAuthStore } from '../store/authstore';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
    const { login, isLoggingIn } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      await  login(formData);

   
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900/20 to-black p-4 lg:p-8 gap-6 lg:gap-12 w-full relative overflow-hidden  ">
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl animate-ping"></div>
      </div>

      <div className="w-full lg:w-1/2 max-w-md mx-auto lg:mx-0 p-4 lg:p-8 bg-slate-900/60 border-white/20 rounded-4xl shadow-2xl shadow-purple-500/10 transform hover:scale-[1.02] transition-all duration-500">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r text-white bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-white text-lg">Sign in to continue your journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Email */}
          <label className=" left-12 top-1/2 -translate-y-1/2 text-sm text-white/80 transition-all duration-300 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:text-xs pointer-events-none z-10  px-2">
              Email Address
            </label>
          <div className="relative">
            
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white h-5 w-5 z-20 pointer-events-none" />
            <input
              type="email"
              name="email"
              placeholder=" your@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full h-14 pl-12 pr-4 bg-white/10 border rounded-2xl text-white peer"
            />
          </div>

          {/* Password */}
           <label className=" left-12 top-1/2 -translate-y-1/2 text-sm text-white/80 transition-all duration-300 peer-focus:-translate-y-6 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:text-xs pointer-events-none z-10  px-2">
              Password
            </label>
          <div className="relative">
           
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white h-5 w-5 z-20 pointer-events-none" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="..... "
              value={formData.password}
              onChange={handleInputChange}
              className="w-full h-14 pl-12 pr-12 bg-white/10 border rounded-2xl text-white peer"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors z-30"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full px-8 min-h-[48px] md:min-h-[44px] relative z-20 shadow-lg hover:shadow-purple-500/25 bg-black hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl touch-manipulation pointer-events-auto active:opacity-90 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log In"
              )}
          </button>
        </form>

        {/* Link to Signup */}
        <div className="mt-8 text-center">
          <p className="text-white">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="relative z-20 inline-block px-2 py-2   text-white font-semibold rounded-lg touch-manipulation pointer-events-auto transition-all duration-300 active:opacity-90 min-h-[44px] flex items-center"
            >
              Create one here
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

export default Login;

