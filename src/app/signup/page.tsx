'use client';

import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validations, setValidations] = useState({
    hasLetter: false,
    hasNumber: false,
    hasSpecial: false,
    hasCapital: false,
    hasNoSpace: true,
    validLength: false,
    passwordsMatch: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validatePassword = (password: string) => {
    setValidations({
      ...validations,
      hasLetter: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasCapital: /[A-Z]/.test(password),
      hasNoSpace: !/\s/.test(password),
      validLength: password.length >= 8 && password.length <= 20,
      passwordsMatch: password === formData.confirmPassword
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      validatePassword(value);
    }
    if (name === 'confirmPassword') {
      setValidations(prev => ({
        ...prev,
        passwordsMatch: value === formData.password
      }));
    }
  };

  const isFormValid = () => {
    return Object.values(validations).every(value => value === true) && formData.email.includes('@');
  };

  const getValidationColor = (isValid: boolean, isTouched: boolean) => {
    if (!isTouched) return 'text-gray-400';
    return isValid ? 'text-green-400' : 'text-red-400';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    try {
      // Update API URL to match Astro's API routes pattern
      const res = await fetch('http://localhost:4321/api/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      
      let data;
      try {
        data = await res.json();
      } catch (error) {
        console.error('Response parsing error:', await res.text());
        throw new Error('Server error: Invalid response format');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }
      
      console.log('Signup successful:', data);
      router.push('/login');
    } catch (error: Error) {
      console.error('Signup error:', error);
      setError(error.message || 'An error occurred during signup');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Decorative */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-cyan-800 via-teal-700 to-cyan-600 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
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
        </div>
        
        {/* Content - Moved to bottom left */}
        <div className="absolute bottom-12 left-12 z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl text-white/90 mb-2"
          >
            Already have an account?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link 
              href="/login"
              className="text-blue-400 text-xl hover:text-blue-300 transition-colors cursor-pointer"
            >
              Login
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Section - Form */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 bg-gray-900 px-8 md:px-16 flex items-center"
      >
        <div className="w-full max-w-md mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-white mb-2">Sign Up</h2>
            <p className="text-gray-400">Create your account to get started</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded"
            >
              {error}
            </motion.div>
          )}

          <motion.form 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-gray-300 mb-2 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-colors"
                placeholder="Create a password"
                required
              />
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {[
                  { label: 'Contains a letter', check: validations.hasLetter },
                  { label: 'Contains a number', check: validations.hasNumber },
                  { label: 'Contains a special character', check: validations.hasSpecial },
                  { label: 'Contains a capital letter', check: validations.hasCapital },
                  { label: 'No spaces', check: validations.hasNoSpace },
                  { label: '8-20 characters', check: validations.validLength }
                ].map(({ label, check }) => (
                  <div 
                    key={label} 
                    className={`flex items-center gap-2 ${getValidationColor(check, formData.password.length > 0)}`}
                  >
                    {check && <FaCheck size={12} />}
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-500 text-white transition-colors"
                placeholder="Confirm your password"
                required
              />
              {formData.confirmPassword && (
                <div className={`mt-2 flex items-center gap-2 ${validations.passwordsMatch ? 'text-green-400' : 'text-red-400'}`}>
                  {validations.passwordsMatch ? (
                    <>
                      <FaCheck size={12} />
                      <span className="text-sm">Passwords match</span>
                    </>
                  ) : (
                    <span className="text-sm">Passwords do not match</span>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className={`w-full px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isFormValid() && !isSubmitting
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 transform hover:scale-[1.02] text-white'
                  : 'bg-gray-600 cursor-not-allowed text-gray-400'
              }`}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </motion.form>

          <div className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-cyan-400 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}