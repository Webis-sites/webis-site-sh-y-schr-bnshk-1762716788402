'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaGlobeAsia, FaCheckCircle, FaArrowDown } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 1.2,
      },
    },
  };

  return (
    <section 
      id="hero-section" 
      dir="rtl" 
      className="relative w-full h-screen overflow-hidden bg-[#121212] text-right"
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-black/60 z-10"
          style={{ backdropFilter: 'blur(2px)' }}
        ></div>
        <div 
          className="relative w-full h-full"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <Image
            src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Defense technology background"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 flex flex-col items-end justify-center h-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-3/4 lg:w-2/3"
        >
          {/* Logo/Headline */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-7xl md:text-9xl font-bold text-white tracking-tighter">
              ש.י
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-xl md:text-2xl font-medium text-[#a1a1a1]">
              חברת נשק וסחר בינלאומי
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div 
            variants={itemVariants} 
            className="mb-10 backdrop-blur-sm bg-black/30 p-6 border border-gray-800 rounded-lg"
          >
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              חברת ש.י היא חברה חדשה וחדשנית בתחום הסחר הבינלאומי בנשק. החברה מתמחה בייבוא, ייצוא וסחר של אמצעי לחימה וציוד ביטחוני בין מדינות, ובאספקת פתרונות מתקדמים לגורמים ממשלתיים, ארגונים רשמיים וגורמי ביטחון במדינת ישראל ובעולם.
            </p>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            variants={badgeVariants}
            className="flex flex-wrap justify-end gap-4 mb-10"
          >
            <div className="flex items-center bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-gray-700">
              <span className="text-xs text-gray-300 ml-2">פועלים לפי תקני בטיחות בינלאומיים</span>
              <FaShieldAlt className="text-[#a1a1a1]" />
            </div>
            <div className="flex items-center bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-gray-700">
              <span className="text-xs text-gray-300 ml-2">שירות גלובלי</span>
              <FaGlobeAsia className="text-[#a1a1a1]" />
            </div>
            <div className="flex items-center bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-gray-700">
              <span className="text-xs text-gray-300 ml-2">עמידה בתקני רגולציה</span>
              <FaCheckCircle className="text-[#a1a1a1]" />
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-[#121212] font-bold rounded-lg hover:bg-gray-200 transition-colors"
              onClick={scrollToContact}
            >
              צור קשר
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-white border-2 border-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              onClick={scrollToContact}
            >
              לפרטים נוספים
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FaArrowDown className="text-white text-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;