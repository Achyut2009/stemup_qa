'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaTimes } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { name: string; href: string; }[];
}

export default function Sidebar({ isOpen, onClose, navLinks }: SidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-cyan-800 to-teal-600 z-50 md:hidden"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end">
            <button onClick={onClose} className="text-white p-2">
              <FaTimes size={24} />
            </button>
          </div>

          <div className="flex flex-col space-y-4 mt-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white/90 hover:text-white text-lg py-2 transition-colors"
                onClick={onClose}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/join"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors text-center mt-4"
              onClick={onClose}
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
