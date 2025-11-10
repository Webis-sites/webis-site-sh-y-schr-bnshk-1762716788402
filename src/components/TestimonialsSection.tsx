'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteRight, FaStar, FaStarHalf } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Define testimonial type
interface Testimonial {
  id: number;
  quote: string;
  role: string;
  region?: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "שיתוף הפעולה עם ש.י הוביל לשדרוג משמעותי של יכולות האבטחה שלנו. המקצועיות והדיוק בהתאמת הציוד לצרכים שלנו היו ללא דופי.",
    role: "קצין בכיר בארגון ביטחוני",
    region: "מזרח תיכון",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    quote: "האמינות והמחויבות של ש.י לעמידה בכל התקנות הבינלאומיות הופכת אותם לשותף אסטרטגי אידיאלי. הם מבינים את המורכבות של הסחר הבינלאומי בתחום הביטחוני.",
    role: "נציג ממשלתי",
    region: "אירופה",
    rating: 4.5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    quote: "איכות השירות והמוצרים שמספקת ש.י עולה על כל הציפיות. הם מבינים את הצרכים המיוחדים שלנו ומספקים פתרונות מותאמים אישית.",
    role: "מנהל בכיר בחברת אבטחה",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    quote: "המומחיות הטכנית והידע העמוק של צוות ש.י בתחום הציוד הביטחוני מרשימים ביותר. הם תמיד מעודכנים בטכנולוגיות החדשות ביותר.",
    role: "ראש מחלקת רכש בארגון ביטחוני",
    region: "צפון אמריקה",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];

// Star rating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`star-${i}`} className="text-yellow-500" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalf key="half-star" className="text-yellow-500" />);
  }

  return <div className="flex gap-1 mt-2">{stars}</div>;
};

// Testimonial card component
const TestimonialCard: React.FC<{ testimonial: Testimonial; isActive: boolean }> = ({ 
  testimonial, 
  isActive 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`w-full h-full flex flex-col justify-between ${isActive ? 'block' : 'hidden'}`}
    >
      <div className="relative bg-[#1a1a1a] backdrop-blur-lg bg-opacity-70 p-8 rounded-xl border border-[#2a2a2a] shadow-xl">
        <div className="absolute top-6 right-6 text-[#a1a1a1] opacity-30">
          <FaQuoteRight size={32} />
        </div>
        
        <div className="flex flex-col h-full">
          <p className="text-[#e1e1e1] text-lg mb-6 relative z-10 leading-relaxed">
            {testimonial.quote}
          </p>
          
          <div className="mt-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#2a2a2a]">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.role} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-[#e1e1e1] font-bold">{testimonial.role}</h4>
                {testimonial.region && (
                  <p className="text-[#a1a1a1] text-sm">{testimonial.region}</p>
                )}
                <StarRating rating={testimonial.rating} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Reset interval when manually changing slides
  const handleManualNavigation = (callback: () => void) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    callback();
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 8000);
  };

  // Indicator dots
  const renderIndicators = () => {
    return (
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={`indicator-${index}`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              handleManualNavigation(() => setCurrentIndex(index));
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[#a1a1a1] w-6' : 'bg-[#3a3a3a]'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" dir="rtl" className="py-20 bg-[#121212] text-right">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">מה אומרים עלינו</h2>
          <p className="text-[#a1a1a1] max-w-2xl mx-auto">
            לקוחותינו מספרים על החוויה שלהם בעבודה עם ש.י סחר בנשק
          </p>
        </motion.div>

        <div className="relative">
          <div className="relative h-[400px] md:h-[350px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 }
                }}
                className="absolute w-full h-full"
              >
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    isActive={index === currentIndex}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 -mt-6 px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleManualNavigation(prevSlide)}
              className="bg-[#1a1a1a] bg-opacity-70 backdrop-blur-lg text-white p-3 rounded-full border border-[#2a2a2a] shadow-lg focus:outline-none"
              aria-label="Previous testimonial"
            >
              <IoIosArrowForward size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleManualNavigation(nextSlide)}
              className="bg-[#1a1a1a] bg-opacity-70 backdrop-blur-lg text-white p-3 rounded-full border border-[#2a2a2a] shadow-lg focus:outline-none"
              aria-label="Next testimonial"
            >
              <IoIosArrowBack size={24} />
            </motion.button>
          </div>
        </div>

        {renderIndicators()}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] bg-opacity-70 backdrop-blur-lg px-6 py-3 rounded-full border border-[#2a2a2a]">
            <span className="text-[#a1a1a1]">אמינות ומקצועיות ללא פשרות</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar key={star} className="text-yellow-500" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;