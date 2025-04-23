'use client';

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Workshops() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow mt-16">
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-800 to-teal-600">
          <main className="flex-grow pt-20 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12"
              >
                <h1 className="text-4xl font-bold text-white mb-6">Our Workshops</h1>
                <p className="text-gray-200 mb-8">
                  Discover our range of STEM workshops designed to inspire and educate.
                </p>
                {/* Add workshop content here */}
              </motion.div>
            </div>
          </main>

          {/* About StemUp Section */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4">
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-12"
              >
                <motion.div variants={item} className="text-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 text-transparent bg-clip-text">
                    About Our Workshops
                  </h2>
                  <p className="mt-4 text-gray-200">
                    Join us in our journey of exploring STEM through hands-on learning experiences.
                  </p>
                </motion.div>

                <motion.div 
                  variants={container}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {[
                    {
                      title: "Interactive Learning",
                      description: "Engage in hands-on activities and real-world problem solving"
                    },
                    {
                      title: "Expert Guidance",
                      description: "Learn from experienced mentors and industry professionals"
                    },
                    {
                      title: "Collaborative Environment",
                      description: "Work with peers on exciting projects and challenges"
                    },
                    {
                      title: "Modern Technology",
                      description: "Access to cutting-edge tools and resources"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={item}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/15 transition-all"
                    >
                      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  variants={item}
                  className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl p-8 backdrop-blur-lg"
                >
                  <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Learning?</h3>
                  <p className="text-gray-200 mb-6">
                    Our workshops are designed for all skill levels and ages. Join us today!
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                  >
                    Browse Workshops
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </section>
          <Footer />
        </div>
      </div>
    </div>
  );
}