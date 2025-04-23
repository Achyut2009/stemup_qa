'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = [
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'Workshops', href: '/workshops' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-cyan-800/30 to-teal-600/30 backdrop-blur-md z-50 border-b border-white/10 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 text-transparent bg-clip-text">
                StemUp
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/90 hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/signup"
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-white p-2"
            >
              <FaBars size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar for mobile */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} navLinks={navLinks} />
    </>
  );
}
