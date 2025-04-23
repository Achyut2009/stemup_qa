'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Newsletter() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-800 to-teal-600">
      <Navbar />
      <div className="flex-grow mt-16">
        <main className="pt-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12"
            >
              <h1 className="text-4xl font-bold text-white mb-6">Newsletter</h1>
              <p className="text-gray-200 mb-8">
                Stay updated with our latest STEM activities and workshops.
              </p>
              {/* Add newsletter content here */}
            </motion.div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
