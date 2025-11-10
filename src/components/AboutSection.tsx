'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { FaShieldAlt, FaGlobeAmericas, FaHandshake, FaBalanceScale } from 'react-icons/fa';
import Image from 'next/image';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => {
  return (
    <motion.div 
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-6 flex flex-col items-center text-center"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-3xl mb-2 text-[#a1a1a1]">{icon}</div>
      <h3 className="text-3xl font-bold mb-1 text-white">{value}</h3>
      <p className="text-[#a1a1a1]">{label}</p>
    </motion.div>
  );
};

const AboutSection: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <section 
      id="about" 
      className="py-20 bg-gradient-to-b from-[#121212] to-[#1a1a1a] text-white overflow-hidden"
      dir="rtl"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className={`flex flex-col ${isMobile ? '' : 'md:flex-row'} items-center gap-12`}
        >
          {/* Visual Column */}
          <motion.div 
            variants={imageVariants} 
            className="w-full md:w-1/2 relative"
          >
            <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
              <Image
                src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&q=80&w=1000"
                alt="ציוד צבאי מתקדם"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-70"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-sm bg-black/30 border-t border-white/10">
                <h3 className="text-2xl font-bold mb-2 text-right">ש.י סחר בנשק</h3>
                <p className="text-[#a1a1a1] text-right">מובילים בתחום הסחר הבינלאומי באמצעי לחימה</p>
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
            variants={itemVariants} 
            className="w-full md:w-1/2 text-right"
          >
            <motion.span 
              variants={itemVariants}
              className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#a1a1a1] text-sm font-medium mb-4"
            >
              אודות החברה
            </motion.span>
            
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 text-right"
            >
              מובילים בסחר <span className="text-[#a1a1a1]">בינלאומי</span> באמצעי לחימה
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-[#e0e0e0] mb-6 leading-relaxed text-right"
            >
              חברת ש.י היא חברה חדשה וחדשנית בתחום הסחר הבינלאומי בנשק. החברה מתמחה בייבוא, ייצוא וסחר של אמצעי לחימה וציוד ביטחוני בין מדינות, ובאספקת פתרונות מתקדמים לגורמים ממשלתיים, ארגונים רשמיים וגורמי ביטחון במדינת ישראל ובעולם.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-[#e0e0e0] mb-8 leading-relaxed text-right"
            >
              ש.י פועלת על פי תקני בטיחות, פיקוח ורגולציה מחמירים, תוך הקפדה על שקיפות מלאה, אמינות ועמידה בכל דרישות החוק המקומיות והבינלאומיות.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-8 justify-end"
            >
              <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1a1]">תקינה בינלאומית</span>
              <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1a1]">שותפויות ממשלתיות</span>
              <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1a1]">אישורי אבטחה</span>
              <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1a1]">פעילות אתית</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={itemVariants}>
            <StatCard 
              icon={<FaShieldAlt />} 
              value="25+" 
              label="שנות ניסיון מצטבר" 
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard 
              icon={<FaGlobeAmericas />} 
              value="30+" 
              label="מדינות בשירות" 
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard 
              icon={<FaHandshake />} 
              value="100%" 
              label="אישורי תקינה" 
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard 
              icon={<FaBalanceScale />} 
              value="500+" 
              label="פעילויות מוצלחות" 
            />
          </motion.div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-2xl font-bold mb-6"
          >
            המטרה שלנו
          </motion.h3>
          <motion.p 
            variants={itemVariants}
            className="text-lg text-[#e0e0e0] leading-relaxed"
          >
            מטרת החברה היא לספק גישה יעילה, בטוחה ואמינה למערכות נשק וציוד ביטחוני איכותי, בשירות גורמי ביטחון לאומיים ובין־לאומיים.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;