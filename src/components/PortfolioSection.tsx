'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaGlobeAsia, FaShieldAlt, FaTools, FaTrophy } from 'react-icons/fa';

// Define types for case studies
interface CaseStudy {
  id: number;
  title: string;
  region: string;
  challenge: string;
  solution: string;
  outcome: string;
  image: string;
  type: 'defense' | 'consulting' | 'import' | 'export';
}

const PortfolioSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Case studies data
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: 'אספקת מערכות הגנה למדינה באירופה',
      region: 'אירופה',
      challenge: 'אספקת מערכות הגנה מתקדמות תוך עמידה בדרישות רגולטוריות מחמירות ולוחות זמנים קצרים',
      solution: 'פיתוח מערך לוגיסטי ייעודי ושיתוף פעולה עם גורמי ממשל לקיצור תהליכי אישור',
      outcome: 'אספקה מוצלחת של המערכות בזמן, תוך יצירת בסיס לשיתוף פעולה ארוך טווח',
      image: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      type: 'defense'
    },
    {
      id: 2,
      title: 'ייעוץ ביטחוני לארגון ממשלתי במזרח התיכון',
      region: 'מזרח תיכון',
      challenge: 'שדרוג מערך האבטחה של מתקנים אסטרטגיים תוך התמודדות עם איומים מתפתחים',
      solution: 'ניתוח מקיף של פערי אבטחה ופיתוח תכנית הגנה רב-שכבתית מותאמת לאיומים הספציפיים',
      outcome: 'שיפור משמעותי ברמת האבטחה וצמצום אירועי חדירה ב-85%',
      image: 'https://images.unsplash.com/photo-1577017040065-650ee4d43339?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      type: 'consulting'
    },
    {
      id: 3,
      title: 'ייבוא ציוד טקטי מתקדם',
      region: 'גלובלי',
      challenge: 'רכישה והבאת ציוד טקטי מתקדם ממספר מקורות בינלאומיים תוך עמידה בדרישות רגולטוריות מורכבות',
      solution: 'יצירת רשת ספקים אמינה ופיתוח מערכת ניהול שרשרת אספקה ייעודית',
      outcome: 'הקמת ערוץ אספקה יציב המאפשר גישה לטכנולוגיות מתקדמות בזמן קצר ובעלות אופטימלית',
      image: 'https://images.unsplash.com/photo-1542451313056-b7c8e626645f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      type: 'import'
    },
    {
      id: 4,
      title: 'אספקת מערכות תקשורת מאובטחות',
      region: 'אפריקה',
      challenge: 'פריסת מערכות תקשורת מאובטחות באזורים מרוחקים עם תשתית מוגבלת',
      solution: 'פיתוח פתרון תקשורת היברידי המשלב טכנולוגיות לוויין וסלולר עם הצפנה מתקדמת',
      outcome: 'הקמת רשת תקשורת אמינה ומאובטחת המאפשרת פעילות מבצעית רציפה בתנאי שטח מאתגרים',
      image: 'https://images.unsplash.com/photo-1569017388730-020b5f80a004?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      type: 'defense'
    },
    {
      id: 5,
      title: 'הדרכות מבצעיות לכוחות ביטחון',
      region: 'דרום אמריקה',
      challenge: 'הכשרת יחידות מיוחדות בטכניקות מתקדמות תוך התאמה לאיומים מקומיים ייחודיים',
      solution: 'פיתוח תכנית הדרכה מודולרית המשלבת סימולציות מתקדמות ותרגול מעשי',
      outcome: 'שיפור משמעותי ביכולות המבצעיות ובמוכנות הכוחות להתמודדות עם מגוון איומים',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      type: 'consulting'
    },
    {
      id: 6,
      title: 'ייצוא טכנולוגיות הגנה מתקדמות',
      region: 'אסיה',
      challenge: 'העברת טכנולוגיות הגנה מתקדמות תוך שמירה על סודיות ועמידה במגבלות ייצוא ביטחוני',
      solution: 'פיתוח מודל העברת ידע מדורג ומאובטח בשיתוף עם רשויות רגולטוריות',
      outcome: 'יצירת שותפות אסטרטגית ארוכת טווח המאפשרת העברת טכנולוגיה בטוחה ויעילה',
      image: 'https://images.unsplash.com/photo-1624969862293-b749659a180b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      type: 'export'
    }
  ];

  // Get icon based on case study type
  const getTypeIcon = (type: CaseStudy['type']) => {
    switch (type) {
      case 'defense':
        return <FaShieldAlt className="ml-2" />;
      case 'consulting':
        return <FaTools className="ml-2" />;
      case 'import':
        return <FaArrowLeft className="ml-2" />;
      case 'export':
        return <FaGlobeAsia className="ml-2" />;
      default:
        return <FaShieldAlt className="ml-2" />;
    }
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
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const expandCardVariants = {
    collapsed: { height: 'auto', opacity: 1 },
    expanded: { height: 'auto', opacity: 1 }
  };

  const expandContentVariants = {
    collapsed: { opacity: 0, height: 0 },
    expanded: { opacity: 1, height: 'auto' }
  };

  return (
    <section 
      id="portfolio" 
      dir="rtl" 
      className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#121212] text-right"
      ref={ref}
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">פרויקטים נבחרים</h2>
          <p className="text-[#a1a1a1] text-lg md:text-xl max-w-3xl mx-auto">
            מוניטין מוכח של הצלחה בפרויקטים ביטחוניים מורכבים ברחבי העולם, תוך שמירה על סטנדרטים גבוהים של מקצועיות, אמינות ודיסקרטיות
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              layoutId={`card-container-${study.id}`}
              onClick={() => setExpandedId(expandedId === study.id ? null : study.id)}
              className="bg-[#1a1a1a]/80 backdrop-blur-md border border-[#2a2a2a] rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 hover:border-[#3a3a3a] hover:shadow-[0_0_25px_rgba(161,161,161,0.1)]"
              style={{ 
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent opacity-80"></div>
                <div className="absolute bottom-0 right-0 p-4">
                  <div className="flex items-center text-[#a1a1a1] text-sm font-medium bg-[#121212]/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    {getTypeIcon(study.type)}
                    <span>{study.region}</span>
                  </div>
                </div>
              </div>

              <motion.div 
                variants={expandCardVariants}
                initial="collapsed"
                animate={expandedId === study.id ? "expanded" : "collapsed"}
                className="p-6"
              >
                <h3 className="text-xl font-bold text-white mb-2">{study.title}</h3>
                
                <AnimatePresence>
                  {expandedId === study.id ? (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={expandContentVariants}
                      transition={{ duration: 0.4 }}
                      className="mt-4 space-y-4 overflow-hidden"
                    >
                      <div>
                        <h4 className="text-[#a1a1a1] font-bold mb-1 flex items-center">
                          <span className="ml-2">אתגר:</span>
                        </h4>
                        <p className="text-white/90">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-[#a1a1a1] font-bold mb-1 flex items-center">
                          <span className="ml-2">פתרון:</span>
                        </h4>
                        <p className="text-white/90">{study.solution}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-[#a1a1a1] font-bold mb-1 flex items-center">
                          <FaTrophy className="ml-2" />
                          <span>תוצאה:</span>
                        </h4>
                        <p className="text-white/90">{study.outcome}</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.p 
                      className="text-[#a1a1a1] mt-2"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      לחץ להצגת פרטים נוספים
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;