'use client';

import { FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contact() {
  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com/stemup',
      icon: <FaTwitter className="text-2xl" />,
      color: 'hover:bg-blue-400',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/stemup',
      icon: <FaLinkedin className="text-2xl" />,
      color: 'hover:bg-blue-600',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/stemup',
      icon: <FaInstagram className="text-2xl" />,
      color: 'hover:bg-pink-500',
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/stemup',
      icon: <FaDiscord className="text-2xl" />,
      color: 'hover:bg-indigo-500',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/stemup',
      icon: <FaGithub className="text-2xl" />,
      color: 'hover:bg-gray-700',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-16">
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-800 to-teal-600">
          <div className="flex-grow pt-20 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12"
              >
                <h1 className="text-4xl font-bold text-white mb-6">Get in Touch</h1>
                <p className="text-gray-200 mb-8">
                  Have questions about StemUp? We'd love to hear from you. Send us a message or connect with us on social media.
                </p>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">Contact Info</h2>
                    <div className="text-gray-200 space-y-2">
                      <p>Email: contact@stemup.edu</p>
                      <p>Phone: +1 (555) 123-4567</p>
                      <p>Location: San Francisco, CA</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white">Office Hours</h2>
                    <div className="text-gray-200 space-y-2">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Connect With Us</h2>
                  <div className="flex flex-wrap gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 bg-white/20 hover:bg-opacity-100 transition-colors px-4 py-2 rounded-full text-white ${social.color}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.icon}
                        <span>{social.name}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
