"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShieldAlt, 
  FaGlobe, 
  FaUserCheck, 
  FaTruck, 
  FaHandshake, 
  FaFileContract, 
  FaCreditCard, 
  FaHeadset 
} from "react-icons/fa";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const FAQSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  const faqItems: FAQItem[] = [
    {
      id: "licensing",
      question: "מהם התנאים לרכישת ציוד ביטחוני?",
      answer: "רכישת ציוד ביטחוני מחברת ש.י דורשת עמידה בתנאי רישוי מחמירים. על הלקוחות להציג אישורים רשמיים ממשרד הביטחון או גוף ממשלתי מוסמך, להוכיח זהות ארגונית מאומתת, ולעמוד בכל דרישות החוק המקומי והבינלאומי. תהליך האימות כולל בדיקת רקע מקיפה וחתימה על הסכמי שימוש נאות.",
      icon: <FaShieldAlt className="text-2xl text-gray-300" />
    },
    {
      id: "compliance",
      question: "כיצד מבטיחים עמידה ברגולציה?",
      answer: "חברת ש.י מקפידה על עמידה מלאה בכל תקנות הסחר הבינלאומי בנשק. אנו מעסיקים צוות מומחי רגולציה המתעדכן באופן שוטף בשינויי חקיקה, מנהלים מערכת תיעוד ובקרה מתקדמת, ועובדים בשיתוף פעולה הדוק עם רשויות פיקוח בינלאומיות. כל עסקה עוברת בדיקת תאימות מקיפה טרם אישורה.",
      icon: <FaFileContract className="text-2xl text-gray-300" />
    },
    {
      id: "approval",
      question: "מהו תהליך האישור?",
      answer: "תהליך האישור בחברת ש.י כולל מספר שלבים: 1) הגשת בקשה רשמית הכוללת פרטי הלקוח ומפרט הציוד המבוקש, 2) בדיקת זכאות ואימות זהות, 3) בחינת עמידה בדרישות רגולטוריות, 4) קבלת אישורים ממשרד הביטחון והרשויות הרלוונטיות, 5) חתימה על הסכמי שימוש והתחייבויות, 6) אישור סופי והוצאת היתרי ייבוא/ייצוא. התהליך אורך בין 30-90 יום בהתאם למורכבות העסקה.",
      icon: <FaUserCheck className="text-2xl text-gray-300" />
    },
    {
      id: "countries",
      question: "לאילו מדינות אתם מספקים?",
      answer: "חברת ש.י מספקת ציוד ביטחוני למדינות המאושרות על ידי משרד הביטחון הישראלי ובהתאם להסכמי סחר בינלאומיים. אנו פועלים בעיקר במדינות נאט\"ו, האיחוד האירופי, ומדינות בעלות ברית אסטרטגיות של ישראל. חשוב לציין כי אנו מקפידים על מדיניות אתית ולא מספקים למדינות תחת סנקציות בינלאומיות או כאלה המפרות זכויות אדם.",
      icon: <FaGlobe className="text-2xl text-gray-300" />
    },
    {
      id: "clients",
      question: "מיהם הלקוחות הטיפוסיים שלכם?",
      answer: "לקוחותינו העיקריים כוללים גופי ביטחון ממשלתיים, צבאות וכוחות משטרה, סוכנויות אבטחה לאומיות, חברות אבטחה פרטיות מורשות, וארגונים בינלאומיים העוסקים בשמירת שלום. אנו עובדים אך ורק עם גופים מוסמכים ומאושרים, ומקפידים על בדיקות נאותות מקיפות לכל לקוח פוטנציאלי.",
      icon: <FaHandshake className="text-2xl text-gray-300" />
    },
    {
      id: "delivery",
      question: "מהם זמני האספקה הצפויים?",
      answer: "זמני האספקה משתנים בהתאם לסוג המוצר, היקף ההזמנה, והמורכבות הלוגיסטית. עבור ציוד סטנדרטי, זמן האספקה נע בין 30-60 יום מרגע קבלת כל האישורים הנדרשים. עבור מערכות מורכבות או הזמנות מותאמות אישית, זמן האספקה עשוי להגיע ל-120 יום או יותר. אנו מספקים מעקב מאובטח אחר משלוחים ועדכונים שוטפים ללקוחותינו.",
      icon: <FaTruck className="text-2xl text-gray-300" />
    },
    {
      id: "payment",
      question: "מהם תנאי התשלום?",
      answer: "תנאי התשלום בחברת ש.י כוללים מקדמה של 30-50% עם אישור ההזמנה, והיתרה לפני המשלוח. אנו מקבלים העברות בנקאיות בינלאומיות מאובטחות, מכתבי אשראי, ובמקרים מסוימים הסכמי מימון ממשלתיים. כל העסקאות מתבצעות בהתאם לתקנות הפיננסיות הבינלאומיות ודרישות איסור הלבנת הון.",
      icon: <FaCreditCard className="text-2xl text-gray-300" />
    },
    {
      id: "support",
      question: "מהו השירות שניתן לאחר המכירה?",
      answer: "חברת ש.י מציעה מערך תמיכה מקיף לאחר המכירה הכולל: הדרכה טכנית מקצועית, תמיכה טלפונית 24/7, שירותי תחזוקה ותיקונים, אחריות יצרן מורחבת, עדכוני תוכנה ושדרוגים, וייעוץ טכני שוטף. בנוסף, אנו מציעים חוזי שירות ארוכי טווח המותאמים לצרכי הלקוח ומבטיחים את אורך חיי המוצר ויעילותו המבצעית.",
      icon: <FaHeadset className="text-2xl text-gray-300" />
    }
  ];

  return (
    <section id="faq" dir="rtl" className="py-16 bg-[#121212] text-right">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl font-bold mb-12 text-white text-center">שאלות נפוצות</h2>
        
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div 
              key={item.id}
              className="relative overflow-hidden"
            >
              <motion.div
                className="backdrop-blur-md bg-[#1a1a1a]/70 border border-[#2a2a2a] rounded-lg overflow-hidden"
                initial={{ opacity: 0.9 }}
                whileHover={{ opacity: 1 }}
                layout
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#a1a1a1]/30 rounded-lg"
                  aria-expanded={activeId === item.id}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-[#232323] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.question}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#a1a1a1]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {activeId === item.id && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 border-t border-[#2a2a2a] text-[#a1a1a1]">
                        <p className="text-lg leading-relaxed">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;