'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        setIsSubmitting(true);
        setError('');
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                // Add cache control to prevent caching issues
                cache: 'no-store'
            });
            
            if (!response.ok) {
                if (response.headers.get('content-type')?.includes('application/json')) {
                    const data = await response.json();
                    setError(data.error || 'Invalid email or password');
                } else {
                    const text = await response.text();
                    console.error('Non-JSON response:', text);
                    setError('Server error. Please try again later.');
                }
                return;
            }
            
            // Successful login - redirect to dashboard
            router.push('/dashboard');
            
        } catch (error) {
            console.error('Error during login:', error);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-800 via-teal-700 to-cyan-600 relative overflow-hidden">
            {/* Background animated elements */}
            <motion.div 
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.2, 0.3] 
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.3, 0.2] 
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                />
            </motion.div>

            {/* Form Container */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 bg-gray-900 rounded-xl shadow-xl backdrop-blur-lg bg-opacity-50 relative z-10"
            >
                <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-300 to-teal-300 text-transparent bg-clip-text"
                >
                    Login
                </motion.h1>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                    onSubmit={handleSubmit}
                >
                    {/* Email Field */}
                    <div className="relative group">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white transition-all duration-300"
                            placeholder="Enter your email"
                            required
                        />
                        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-500 to-teal-500 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300" />
                    </div>

                    {/* Password Field */}
                    <div className="relative group">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white transition-all duration-300"
                            placeholder="Enter your password"
                            required
                        />
                        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-500 to-teal-500 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300" />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-500 hover:to-teal-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </motion.button>
                </motion.form>

                {/* Sign up link */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-6 text-center text-sm text-gray-400"
                >
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors hover:underline">
                        Sign up
                    </Link>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default LoginPage;