'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaFileContract, 
  FaGavel, 
  FaEye, 
  FaClipboardCheck,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';
import Image from 'next/image';

interface ComplianceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ComplianceItem: React.FC<ComplianceItemProps> = ({ icon, title, description }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className="bg-opacity-10 backdrop-blur-md bg-white/5 border border-gray-700 rounded-lg p-6 flex flex-col items-end"
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-full mb-4 text-gray-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 text-right">{description}</p>
    </motion.div>
  );
};

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
  isLast?: boolean;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description, isLast = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
      }}
      className="flex items-start relative"
    >
      <div className="flex flex-col items-center mr-4">
        <div className="bg-gradient-to-br from-gray-700 to-gray-900 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold border border-gray-600">
          {number}
        </div>
        {!isLast && (
          <div className="h-full w-0.5 bg-gradient-to-b from-gray-700 to-gray-900 my-2"></div>
        )}
      </div>
      <div className="bg-opacity-10 backdrop-blur-md bg-white/5 border border-gray-700 rounded-lg p-4 flex-1 mb-6">
        <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
        <p className="text-gray-400 text-right">{description}</p>
      </div>
    </motion.div>
  );
};

const ComplianceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const complianceItems = [
    {
      icon: <FaShieldAlt size={24} />,
      title: 'עמידה בתקני בטיחות בינלאומיים',
      description: 'אנו מקפידים על עמידה בכל תקני הבטיחות הבינלאומיים המחמירים ביותר בתעשיית הנשק והציוד הביטחוני.'
    },
    {
      icon: <FaFileContract size={24} />,
      title: 'רישיונות ייבוא וייצוא',
      description: 'חברת ש.י פועלת תחת כל הרישיונות והאישורים הנדרשים לייבוא וייצוא של אמצעי לחימה בהתאם לחוקים המקומיים והבינלאומיים.'
    },
    {
      icon: <FaGavel size={24} />,
      title: 'פיקוח ממשלתי',
      description: 'כל פעילות החברה מתבצעת תחת פיקוח ממשלתי הדוק ובהתאם להנחיות משרד הביטחון ומשרד החוץ.'
    },
    {
      icon: <FaEye size={24} />,
      title: 'שקיפות מלאה',
      description: 'אנו מחויבים לשקיפות מלאה בכל תהליכי העבודה, הדיווח והתיעוד מול הרשויות והלקוחות.'
    },
    {
      icon: <FaClipboardCheck size={24} />,
      title: 'ביקורות ואישורים',
      description: 'החברה עוברת ביקורות תקופתיות ומחזיקה באישורים מכל הגופים הרגולטוריים הרלוונטיים בתחום הסחר בנשק.'
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: 'בדיקת רקע מקיפה',
      description: 'בחינה מעמיקה של כל לקוח פוטנציאלי ואימות זהות מול מאגרי מידע בינלאומיים.'
    },
    {
      number: 2,
      title: 'אישורים רגולטוריים',
      description: 'קבלת כל האישורים הנדרשים ממשרד הביטחון, משרד החוץ וגופי פיקוח בינלאומיים.'
    },
    {
      number: 3,
      title: 'תיעוד ומעקב',
      description: 'תיעוד מדויק של כל שלבי העסקה, כולל מסמכי מקור, אישורי העברה ומעקב שרשרת אספקה.'
    },
    {
      number: 4,
      title: 'פיקוח על השימוש',
      description: 'מעקב אחר השימוש הסופי במוצרים ווידוא עמידה בתנאי הרישיון והחוק.'
    },
    {
      number: 5,
      title: 'דיווח לרשויות',
      description: 'דיווח שוטף ומפורט לכל הרשויות הרלוונטיות על כל פעילות מסחרית.'
    }
  ];

  const certifications = [
    'ISO 9001', 'ISO 14001', 'AQAP 2110', 'TRACE', 'DDTC'
  ];

  return (
    <section id="compliance" dir="rtl" className="py-20 bg-[#121212] text-right" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">אמינות ועמידה ברגולציה</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-700 to-[#a1a1a1] mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            חברת ש.י מחויבת לפעול בהתאם לכל דרישות החוק המקומיות והבינלאומיות, תוך הקפדה על סטנדרטים גבוהים של אתיקה, שקיפות ואחריות.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {complianceItems.map((item, index) => (
            <ComplianceItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-12 mb-20">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } }
            }}
            className="md:w-1/2"
          >
            <h3 className="text-2xl font-bold mb-6 text-white">תהליך אימות ציות ורגולציה</h3>
            <div className="space-y-2">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={index}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  isLast={index === processSteps.length - 1}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.4 } }
            }}
            className="md:w-1/2 relative"
          >
            <div className="relative h-full overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent z-10"></div>
              <Image
                src="https://images.unsplash.com/photo-1589552811689-9b0aca0f7710?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                alt="תהליכי ציות ורגולציה"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 left-0 p-8 bg-gradient-to-t from-[#121212] to-transparent">
              <h4 className="text-xl font-bold text-white mb-2">מחויבות לאחריות</h4>
              <p className="text-gray-300">
                אנו מקפידים על תהליכי בדיקה מחמירים ומעקב מתמיד אחר כל שלבי העסקה, מהזמנה ועד אספקה.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } }
          }}
          className="bg-opacity-10 backdrop-blur-md bg-white/5 border border-gray-700 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">תקנים ואישורים</h3>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-800 to-gray-900 px-6 py-3 rounded-full border border-gray-700 text-white font-bold"
              >
                {cert}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-gray-400 mb-6">
              חברת ש.י גאה לעמוד בכל התקנים והאישורים הנדרשים בתעשיית הסחר בנשק, ומחויבת להמשיך ולשמור על הסטנדרטים הגבוהים ביותר.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gray-700 to-[#a1a1a1] text-white font-bold py-3 px-8 rounded-full inline-flex items-center"
            >
              <span>למידע נוסף על הרגולציה</span>
              <FaArrowLeft className="mr-2" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplianceSection;