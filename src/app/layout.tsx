import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ש.י סחר בנשק',
  description: 'חברת ש.י היא חברה חדשה וחדשנית בתחום הסחר הבינלאומי בנשק. החברה מתמחה בייבוא, ייצוא וסחר של אמצעי לחימה וציוד ביטחוני בין מדינות, ובאספקת פתרונות מתקדמים לגורמים ממשלתיים, ארגונים רשמיים וגורמי ביטחון במדינת ישראל ובעולם.
ש.י פועלת על פי תקני בטיחות, פיקוח ורגולציה מחמירים, תוך הקפדה על שקיפות מלאה, אמינות ועמידה בכל דרישות החוק המקומיות והבינלאומיות.
מטרת החברה היא לספק גישה יעילה, בטוחה ואמינה למערכות נשק וציוד ביטחוני איכותי, בשירות גורמי ביטחון לאומיים ובין־לאומיים.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#121212" />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          {/* Navbar will be inserted here */}
          <Navbar />

          {children}

        </div>
      </body>
    </html>
  );
}
