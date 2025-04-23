'use client';

import { motion } from 'framer-motion';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    { name: 'Instagram', href: '#', icon: <FaInstagram size={20} /> },
    { name: 'WhatsApp', href: '#', icon: <FaWhatsapp size={20} /> },
    { name: 'Email', href: 'mailto:contact@stemup.edu', icon: <FaEnvelope size={20} /> },
  ];

  return (
    <footer className="py-8 bg-gradient-to-r from-cyan-800 via-indigo-700 to-purple-800 backdrop-blur-xl border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/80">
            <p>© {new Date().getFullYear()} StemUp. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
