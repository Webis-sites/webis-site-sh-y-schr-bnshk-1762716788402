'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const hoverVariants = {
    hover: {
      scale: 1.05,
      color: "#ffffff",
      transition: { duration: 0.3 }
    }
  };

  return (
    <footer 
      id="footer" 
      className="bg-[#121212] text-[#a1a1a1] w-full py-12 px-4 md:px-8 lg:px-16"
      dir="rtl"
    >
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Top section with logo and company info */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between mb-10"
          variants={itemVariants}
        >
          <div className="mb-8 md:mb-0 text-right">
            <motion.h2 
              className="text-white text-2xl font-bold mb-2"
              whileHover={{ scale: 1.02 }}
            >
              ש.י סחר בנשק
            </motion.h2>
            <p className="text-sm max-w-md mb-4">
              חברת ש.י היא חברה חדשה וחדשנית בתחום הסחר הבינלאומי בנשק, המתמחה בייבוא, ייצוא וסחר של אמצעי לחימה וציוד ביטחוני.
            </p>
            <div className="relative w-24 h-24 overflow-hidden rounded-md backdrop-blur-sm bg-opacity-20 bg-white border border-gray-700">
              <Image
                src="https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="ש.י סחר בנשק"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Navigation Links */}
          <motion.div 
            className="mb-8 md:mb-0"
            variants={itemVariants}
          >
            <h3 className="text-white text-lg font-semibold mb-4 text-right">ניווט מהיר</h3>
            <ul className="space-y-2 text-right">
              {['בית', 'אודות', 'שירותים', 'מוצרים', 'צור קשר'].map((item) => (
                <li key={item}>
                  <motion.a
                    href={`#${item}`}
                    className="hover:text-white transition-colors duration-300 block"
                    variants={hoverVariants}
                    whileHover="hover"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Legal Links */}
          <motion.div 
            className="mb-8 md:mb-0"
            variants={itemVariants}
          >
            <h3 className="text-white text-lg font-semibold mb-4 text-right">מידע משפטי</h3>
            <ul className="space-y-2 text-right">
              {[
                { name: 'תנאי שימוש', path: '/terms' },
                { name: 'מדיניות פרטיות', path: '/privacy' },
                { name: 'הצהרת רגולציה', path: '/regulation' }
              ].map((item) => (
                <li key={item.name}>
                  <motion.a
                    href={item.path}
                    className="hover:text-white transition-colors duration-300 block"
                    variants={hoverVariants}
                    whileHover="hover"
                  >
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            variants={itemVariants}
            className="text-right"
          >
            <h3 className="text-white text-lg font-semibold mb-4">צור קשר</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-end gap-2">
                <span>info@shi-arms.co.il</span>
                <FaEnvelope className="text-[#a1a1a1]" />
              </li>
              <li className="flex items-center justify-end gap-2">
                <span>03-1234567</span>
                <FaPhone className="text-[#a1a1a1]" />
              </li>
              <li className="flex items-center justify-end gap-2">
                <span>רחוב הארבעה 21, תל אביב</span>
                <FaMapMarkerAlt className="text-[#a1a1a1]" />
              </li>
            </ul>
            
            {/* Social Media */}
            <div className="mt-4 flex justify-end space-x-4 space-x-reverse">
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1e1e1e] p-2 rounded-full hover:bg-[#2d2d2d] transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <FaLinkedin className="text-[#a1a1a1] text-xl" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Divider */}
        <motion.div 
          className="h-px w-full bg-gradient-to-r from-transparent via-[#2d2d2d] to-transparent my-8"
          variants={itemVariants}
        />
        
        {/* Compliance Statement */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <p className="text-sm backdrop-blur-sm bg-[#1a1a1a] bg-opacity-50 p-4 rounded-md border border-[#2d2d2d] inline-block">
            פועלים בהתאם לכל דרישות החוק המקומיות והבינלאומיות
          </p>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          className="text-center text-sm"
          variants={itemVariants}
        >
          <p>© {currentYear} ש.י סחר בנשק. כל הזכויות שמורות.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;