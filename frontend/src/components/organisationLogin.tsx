'use client';

import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { auth } from '@/lib/firebase'; // Adjust the import path as necessary
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const OrganisationLoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, formData.email, formData.password); // Use the raw password
      console.log('Organisation login successful:', formData);
      router.push('/org-dashboard'); // Replace '/organisationDashboard' with the actual path of the organization dashboard page
    } catch (err: any) {
      setError(`Authentication failed: ${err.message}`);
      console.error('Error during authentication:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 
      bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      
      <div className="w-full max-w-[95%] sm:max-w-[440px] p-4 sm:p-6 md:p-8 
        bg-gray-800/60 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl">
        
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold 
            bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Organisation Login
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-gray-400">
            Secure Access to Organisation Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 
                text-gray-400 text-lg sm:text-xl" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 text-sm sm:text-base
                  rounded-lg outline-none transition-all
                  bg-gray-700/50 text-white focus:bg-gray-700/70
                  border border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 
                text-gray-400 text-lg sm:text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-12 py-2.5 sm:py-3 text-sm sm:text-base
                  rounded-lg outline-none transition-all
                  bg-gray-700/50 text-white focus:bg-gray-700/70
                  border border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 
                  text-gray-400 hover:text-gray-300 text-lg sm:text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base
              bg-gradient-to-r from-blue-500 to-purple-500
              hover:from-blue-600 hover:to-purple-600
              text-white font-medium rounded-lg
              transform transition-all duration-200
              hover:scale-[1.02] focus:ring-2 focus:ring-blue-400
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrganisationLoginForm;
