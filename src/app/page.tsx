'use client';

import Image from "next/image";
import Link from "next/link";
import TextScramble from '../components/TextScramble';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const [, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-800 to-teal-600 relative overflow-hidden">

          {/* Animated background effects */}
          <motion.div 
            className="fixed inset-0 -z-10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="absolute -top-1/2 -right-1/2 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl"
              animate={{ 
                y: [0, 50, 0],
                x: [0, 30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute -bottom-1/2 -left-1/2 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl"
              animate={{ 
                y: [0, -50, 0],
                x: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </motion.div>

          {/* Hero Section */}
          <main className="flex-1 container mx-auto px-4 py-16 mt-10 text-white">
            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto space-y-8"
            >
              <motion.h1 variants={item} className="text-5xl md:text-6xl font-bold mb-6">
                <TextScramble 
                  text="Welcome to StemUp"
                  className="bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 text-transparent bg-clip-text"
                />
              </motion.h1>
              <motion.p variants={item} className="text-xl text-gray-200 mb-8">
                Empowering the next generation through STEM education, innovation, and hands-on learning experiences.
              </motion.p>
              
              <motion.div 
                variants={container}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
              >
                {['Learn', 'Connect', 'Grow'].map((title, index) => (
                  <motion.div
                    key={title}
                    variants={item}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 cursor-pointer"
                  >
                    <h3 className="text-xl font-semibold mb-3">{title}</h3>
                    <p className="text-gray-300">
                      {index === 0 && "Access curated STEM resources and interactive learning materials."}
                      {index === 1 && "Join a community of learners, educators, and STEM enthusiasts."}
                      {index === 2 && "Develop skills through workshops, projects, and mentorship."}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                variants={item}
                className="mt-12 flex gap-4 justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/user-interface" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-cyan-800 px-8 py-3 rounded-full font-semibold hover:bg-gradient-to-r hover:from-cyan-800 hover:via-indigo-700 hover:to-purple-800 hover:text-white transition"
                  >
                    Get Started
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href="/workshops" 
                    className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition"
                  >
                    Explore Workshops
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </main>

          {/* About Section */}
          <section className="py-24 relative">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
            
            <div className="container mx-auto px-4">
              <motion.div 
                className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.3,
                    }
                  }
                }}
              >
                {/* Left Column - Text Content */}
                <div className="space-y-6">
                  <motion.h2 
                    className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 text-transparent bg-clip-text"
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
                    }}
                  >
                    About StemUp
                  </motion.h2>
                  
                  <motion.div 
                    className="space-y-4"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                  >
                    <p className="text-gray-200 text-lg leading-relaxed">
                      StemUp is a pioneering student-led organization dedicated to fostering STEM education and innovation among the next generation of leaders.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      Founded by passionate students, we bridge the gap between traditional education and practical innovation through hands-on workshops, mentorship programs, and collaborative projects.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="flex flex-wrap gap-4"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                    }}
                  >
                    {[
                      { number: "500+", label: "Students Impacted" },
                      { number: "50+", label: "Workshops Conducted" },
                      { number: "20+", label: "Student Mentors" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/5 backdrop-blur-lg rounded-lg p-4 flex-1 min-w-[150px] text-center"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                      >
                        <div className="text-2xl font-bold text-purple-300">{stat.number}</div>
                        <div className="text-sm text-gray-300">{stat.label}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Right Column - Image Container */}
                <motion.div 
                  className="relative h-[400px]"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
                  }}
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white/5 backdrop-blur-lg">
                    <Image
                      src="/about-image.jpg" // Add your image to public folder
                      alt="StemUp Activities"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      priority
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-800/40 to-transparent" />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white/5 backdrop-blur-xl border-y border-white/10">
            <div className="container mx-auto px-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-300 to-cyan-300 text-transparent bg-clip-text"
              >
                Why Choose StemUp?
              </motion.h2>
              <motion.div 
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              >
                {[
                  {
                    title: "Expert-Led Workshops",
                    description: "Learn from industry professionals and experienced educators in interactive, hands-on sessions."
                  },
                  {
                    title: "Project-Based Learning",
                    description: "Apply your knowledge through real-world projects and build a portfolio of work."
                  },
                  {
                    title: "Flexible Learning",
                    description: "Access resources and workshops at your own pace, from anywhere in the world."
                  },
                  {
                    title: "Community Support",
                    description: "Join a vibrant community of learners and get support when you need it."
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    variants={item}
                    className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
                  >
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* How to Join Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-300 to-cyan-300 text-transparent bg-clip-text"
              >
                How to Join StemUp
              </motion.h2>
              <div className="max-w-3xl mx-auto relative">
                {/* Vertical line */}
                <motion.div 
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-teal-300 to-cyan-300 origin-top"
                ></motion.div>

                <motion.div 
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="space-y-12"
                >
                  {/* Step 1 */}
                  <motion.div variants={item} className="relative pl-8">
                    <div className="absolute left-[-8px] top-1.5 w-4 h-4 rounded-full bg-teal-300"></div>
                    <h3 className="text-xl font-semibold text-teal-300 mb-2">Step 1: Follow & Connect</h3>
                    <p className="text-gray-200">
                      Follow us on Instagram{' '}
                      <a 
                        href="https://instagram.com/stemupqatar" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-300 hover:text-cyan-200 underline"
                      >
                        @stemupqatar
                      </a>
                      {' '}and send us a direct message to start your journey.
                    </p>
                  </motion.div>

                  {/* Step 2 */}
                  <motion.div variants={item} className="relative pl-8">
                    <div className="absolute left-[-8px] top-1.5 w-4 h-4 rounded-full bg-teal-300"></div>
                    <h3 className="text-xl font-semibold text-teal-300 mb-2">Step 2: Register</h3>
                    <p className="text-gray-200">
                      Fill out our registration form through our Linktree{' '}
                      <a 
                        href="https://linktr.ee/stemupqatar" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-cyan-300 hover:text-cyan-200 underline"
                      >
                        (click here)
                      </a>
                    </p>
                  </motion.div>

                  {/* Step 3 */}
                  <motion.div variants={item} className="relative pl-8">
                    <div className="absolute left-[-8px] top-1.5 w-4 h-4 rounded-full bg-teal-300"></div>
                    <h3 className="text-xl font-semibold text-teal-300 mb-2">Step 3: Contact Us</h3>
                    <p className="text-gray-200">
                      Reach out to us through:
                    </p>
                    <ul className="mt-3 space-y-2 text-gray-200">
                      <li>• WhatsApp: <a href="tel:+97477622949" className="text-cyan-300 hover:text-cyan-200">+974 7762 2949</a></li>
                      <li>• Email: <a href="mailto:stemupqatar@gmail.com" className="text-cyan-300 hover:text-cyan-200">stemupqatar@gmail.com</a></li>
                    </ul>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </div>
  );
}
