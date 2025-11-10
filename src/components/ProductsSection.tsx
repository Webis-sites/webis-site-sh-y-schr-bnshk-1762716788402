'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiChevronRight, FiChevronLeft, FiFilter } from 'react-icons/fi';

// Define product category type
interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

// Product categories data
const productCategories: ProductCategory[] = [
  {
    id: 'small-arms',
    name: 'נשק קל',
    description: 'מגוון רחב של נשק קל לשימוש כוחות ביטחון וצבא, כולל אקדחים, רובים ומקלעים',
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'heavy-weapons',
    name: 'נשק כבד',
    description: 'מערכות נשק כבדות לשימוש צבאי, כולל תותחים, מרגמות ומערכות רקטות',
    image: 'https://images.unsplash.com/photo-1595075614152-d9d0838d3fbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'defense-systems',
    name: 'מערכות הגנה',
    description: 'פתרונות הגנה מתקדמים לאבטחת מתקנים, גבולות ותשתיות קריטיות',
    image: 'https://images.unsplash.com/photo-1576677879650-8db4aaaeb99c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tactical-equipment',
    name: 'ציוד טקטי',
    description: 'ציוד מקצועי לכוחות מיוחדים, כולל אפודים, קסדות וציוד לחימה מתקדם',
    image: 'https://images.unsplash.com/photo-1542549237432-a176cb9d5e5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'surveillance',
    name: 'טכנולוגיות מעקב ובקרה',
    description: 'מערכות מעקב מתקדמות לאיסוף מודיעין, ניטור ואבטחת מידע',
    image: 'https://images.unsplash.com/photo-1563976983419-7063da8f1186?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'armored-vehicles',
    name: 'רכבים משוריינים',
    description: 'רכבים משוריינים לשימוש צבאי ואבטחה, מותאמים לפעילות בתנאי שטח מאתגרים',
    image: 'https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'secure-comms',
    name: 'מערכות תקשורת מאובטחות',
    description: 'פתרונות תקשורת מאובטחים לשימוש צבאי וממשלתי, עמידים בפני האזנות וחסימות',
    image: 'https://images.unsplash.com/photo-1563770660941-10a2b3654e41?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

// Filter options
const filterOptions = [
  { id: 'all', label: 'הכל' },
  { id: 'weapons', label: 'נשק' },
  { id: 'defense', label: 'הגנה' },
  { id: 'vehicles', label: 'רכבים' },
  { id: 'tech', label: 'טכנולוגיה' }
];

// Filter mapping
const filterMapping: Record<string, string[]> = {
  'all': productCategories.map(cat => cat.id),
  'weapons': ['small-arms', 'heavy-weapons'],
  'defense': ['defense-systems', 'tactical-equipment'],
  'vehicles': ['armored-vehicles'],
  'tech': ['surveillance', 'secure-comms']
};

const ProductsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleProducts, setVisibleProducts] = useState<ProductCategory[]>(productCategories);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Filter products based on active filter
  useEffect(() => {
    const filteredIds = filterMapping[activeFilter] || [];
    const filtered = productCategories.filter(product => 
      filteredIds.includes(product.id)
    );
    setVisibleProducts(filtered);
    setCarouselIndex(0); // Reset carousel position when filter changes
  }, [activeFilter]);

  // Carousel navigation
  const nextSlide = () => {
    const maxIndex = Math.max(0, visibleProducts.length - (isMobile ? 1 : 3));
    setCarouselIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCarouselIndex(prev => Math.max(prev - 1, 0));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const filterVariants = {
    inactive: { scale: 1, opacity: 0.7 },
    active: { 
      scale: 1.05, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <section 
      id="products" 
      ref={sectionRef}
      dir="rtl" 
      className="py-16 bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-right"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            המוצרים והפתרונות שלנו
          </h2>
          <div className="w-24 h-1 bg-[#a1a1a1] mx-auto"></div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-center bg-[#1e1e1e] backdrop-blur-md rounded-full p-1 border border-[#2a2a2a] shadow-lg">
            <FiFilter className="text-[#a1a1a1] mr-2 ml-1" />
            {filterOptions.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                variants={filterVariants}
                initial="inactive"
                animate={activeFilter === filter.id ? "active" : "inactive"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-[#a1a1a1] text-[#121212] font-medium"
                    : "text-[#a1a1a1] hover:bg-[#2a2a2a]"
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Products Display */}
        <div className="relative">
          {/* Carousel Navigation Buttons */}
          {visibleProducts.length > (isMobile ? 1 : 3) && (
            <>
              <button
                onClick={prevSlide}
                disabled={carouselIndex === 0}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#121212]/80 backdrop-blur-sm text-white p-3 rounded-full shadow-lg -mr-4 ${
                  carouselIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
                }`}
                aria-label="Previous products"
              >
                <FiChevronRight className="text-xl" />
              </button>
              <button
                onClick={nextSlide}
                disabled={carouselIndex >= visibleProducts.length - (isMobile ? 1 : 3)}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#121212]/80 backdrop-blur-sm text-white p-3 rounded-full shadow-lg -ml-4 ${
                  carouselIndex >= visibleProducts.length - (isMobile ? 1 : 3) ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100'
                }`}
                aria-label="Next products"
              >
                <FiChevronLeft className="text-xl" />
              </button>
            </>
          )}

          {/* Products Carousel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="overflow-hidden px-4"
          >
            <motion.div
              className="flex transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${isMobile ? carouselIndex * 100 : carouselIndex * 33.33}%)`,
              }}
            >
              {visibleProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className={`${
                    isMobile ? 'w-full' : 'w-1/3'
                  } flex-shrink-0 px-3 mb-8`}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="h-full bg-[#1a1a1a]/60 backdrop-blur-md rounded-xl overflow-hidden border border-[#2a2a2a] shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-[#3a3a3a] group">
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-70"></div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-[#a1a1a1] mb-4 text-sm md:text-base">
                        {product.description}
                      </p>
                      <Link 
                        href={`/products/${product.id}`}
                        className="inline-block bg-transparent border border-[#a1a1a1] text-[#a1a1a1] py-2 px-4 rounded-lg transition-all duration-300 hover:bg-[#a1a1a1] hover:text-[#121212] text-sm md:text-base"
                      >
                        לפרטים נוספים
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Pagination Dots for Mobile */}
        {isMobile && visibleProducts.length > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {visibleProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCarouselIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  carouselIndex === index ? 'bg-[#a1a1a1]' : 'bg-[#333333]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;