'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaTools, FaBoxOpen, FaBriefcase, FaComments, FaQuestionCircle, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { id: 'home', label: 'דף הבית', icon: <FaHome className="ml-2" /> },
    { id: 'about', label: 'אודות', icon: <FaInfoCircle className="ml-2" /> },
    { id: 'services', label: 'שירותים', icon: <FaTools className="ml-2" /> },
    { id: 'products', label: 'מוצרים', icon: <FaBoxOpen className="ml-2" /> },
    { id: 'portfolio', label: 'תיק עבודות', icon: <FaBriefcase className="ml-2" /> },
    { id: 'testimonials', label: 'המלצות', icon: <FaComments className="ml-2" /> },
    { id: 'faq', label: 'שאלות נפוצות', icon: <FaQuestionCircle className="ml-2" /> },
    { id: 'contact', label: 'צור קשר', icon: <FaEnvelope className="ml-2" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      closeMenu();
    }
  };

  return (
    <header
      id="main-navigation"
      dir="rtl"
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-opacity-80 backdrop-blur-md shadow-md'
          : 'bg-opacity-95'
      }`}
      style={{ backgroundColor: '#121212' }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link href="/" className="text-white font-bold text-xl md:text-2xl">
              ש.י סחר בנשק
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center space-x-6 space-x-reverse"
          >
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center text-a1a1a1 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-a1a1a1 focus:ring-opacity-50 px-2 py-1 rounded"
                style={{ color: '#a1a1a1' }}
                aria-label={item.label}
              >
                <span className="flex items-center">
                  {item.icon}
                  {item.label}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="md:hidden text-a1a1a1 hover:text-white focus:outline-none focus:ring-2 focus:ring-a1a1a1 focus:ring-opacity-50 p-2 rounded-md"
            style={{ color: '#a1a1a1' }}
            aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="md:hidden fixed top-16 right-0 h-screen w-3/4 bg-[#121212] bg-opacity-95 backdrop-blur-md shadow-lg z-50 overflow-y-auto"
            dir="rtl"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center text-right text-a1a1a1 hover:text-white transition-colors duration-200 py-3 border-b border-gray-700 focus:outline-none focus:ring-2 focus:ring-a1a1a1 focus:ring-opacity-50 rounded px-2"
                  style={{ color: '#a1a1a1' }}
                  aria-label={item.label}
                >
                  <span className="flex items-center text-lg">
                    {item.icon}
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;