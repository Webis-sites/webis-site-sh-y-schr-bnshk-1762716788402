'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaExchangeAlt, 
  FaUserTie, 
  FaHandshake, 
  FaMicrochip, 
  FaTasks 
} from 'react-icons/fa';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: i * 0.1,
        ease: [0.25, 0.1, 0.25, 1.0]
      } 
    }),
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: 5,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-[#1a1a1a] backdrop-blur-md border border-[#2a2a2a] rounded-xl p-6 h-full"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      variants={cardVariants}
      custom={index}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="w-16 h-16 rounded-full bg-[#121212] flex items-center justify-center mb-6 text-[#a1a1a1]"
        variants={iconVariants}
      >
        <div className="text-2xl">
          {icon}
        </div>
      </motion.div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-[#a1a1a1] text-right">{description}</p>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const services = [
    {
      icon: <FaShieldAlt />,
      title: 'ייבוא נשק וציוד ביטחוני',
      description: 'ייבוא מערכות נשק מתקדמות וציוד ביטחוני איכותי ממיטב היצרנים בעולם, תוך הקפדה על עמידה בכל דרישות הרגולציה.'
    },
    {
      icon: <FaExchangeAlt />,
      title: 'ייצוא מערכות לחימה',
      description: 'ייצוא מערכות לחימה ישראליות מתקדמות לגורמי ביטחון מורשים ברחבי העולם, בהתאם לחוקי הייצוא הבינלאומיים.'
    },
    {
      icon: <FaUserTie />,
      title: 'ייעוץ ביטחוני',
      description: 'שירותי ייעוץ מקצועיים בתחום הביטחון והאבטחה, המותאמים לצרכים הספציפיים של כל לקוח ומבוססים על ניסיון מבצעי עשיר.'
    },
    {
      icon: <FaHandshake />,
      title: 'תיווך בין יצרנים לממשלות',
      description: 'גישור אפקטיבי בין יצרני נשק וציוד ביטחוני לבין ממשלות וגופי ביטחון, תוך יצירת שיתופי פעולה אסטרטגיים ארוכי טווח.'
    },
    {
      icon: <FaMicrochip />,
      title: 'אספקת פתרונות טכנולוגיים מתקדמים',
      description: 'אספקת טכנולוגיות חדשניות בתחום הביטחון, כולל מערכות מודיעין, סייבר, תקשורת מאובטחת ומערכות הגנה מתקדמות.'
    },
    {
      icon: <FaTasks />,
      title: 'ניהול פרויקטים ביטחוניים',
      description: 'ניהול מקצועי של פרויקטים ביטחוניים מורכבים, מהתכנון ועד הביצוע, תוך הקפדה על עמידה בלוחות זמנים ובתקציב.'
    }
  ];

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const lineVariants: Variants = {
    hidden: { width: 0 },
    visible: { 
      width: "80px",
      transition: { 
        duration: 0.8,
        delay: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-[#121212] relative overflow-hidden" dir="rtl">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
          alt="Background pattern" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10" ref={sectionRef}>
        <div className="text-center mb-16">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={headerVariants}
            className="inline-block"
          >
            <h2 className="text-4xl font-bold text-white mb-4">השירותים שלנו</h2>
            <motion.div 
              className="h-1 bg-[#a1a1a1] mx-auto"
              variants={lineVariants}
            />
          </motion.div>
          <motion.p 
            className="text-[#a1a1a1] mt-6 max-w-2xl mx-auto text-right md:text-center"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  duration: 0.6,
                  delay: 0.4
                }
              }
            }}
          >
            אנו מציעים מגוון פתרונות ביטחוניים מקיפים המותאמים לצרכים הספציפיים של לקוחותינו, תוך הקפדה על איכות, אמינות ועמידה בסטנדרטים הבינלאומיים המחמירים ביותר.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;