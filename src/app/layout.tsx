import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { SmoothScrollProvider } from "@/contexts/SmoothScrollContext";
import ScrollProgress from "@/components/shared/ScrollProgress";

const inter = Inter_Tight({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-inter",
  display: "swap",
});

const expoArabic = localFont({
  src: [
    {
      path: "../../public/fonts/ExpoArabic-Book.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ExpoArabic-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-expo-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://savvyworld.ai'),

  title: {
    default: "Savvy Roboot   ",
    template: "%s | Savvy Roboot"
  },

  description: "منصة  ذكية توفر أحدث التقنيات والحلول المبتكرة - Smart property solutions with innovative technology",

  keywords: [
    'ربوت ',
    'تقنية روبوت',
    'reboot technology',
    'تقييم روبوت',
    'استثمار روبوت',
    'real estate',
    'property technology',
    'smart solutions'
  ],

  authors: [{ name: 'Savvy Rating', url: 'https://savvy-rating.com' }],

  creator: 'Savvy Rating',

  icons: {
    icon: "/Savvy 2 1.svg",
    apple: "/Savvy 2 1.svg",
  },

  // Open Graph للمشاركة على Facebook, WhatsApp, LinkedIn
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
    url: 'https://savvyworld.ai',
    title: 'Savvy Roboot -  روبوت ذكي`',
    description: 'اكتشف منصتنا المبتكرة لتقييم وإدارة الروبوتات بأحدث التقنيات',
    siteName: 'Savvy Roboot',
    images: [
      {
        url: '/og-image.jpg', // تحتاج إنشاء هذه الصورة 1200x630
        width: 1200,
        height: 630,
        alt: 'Savvy Roboot - Smart Robot Solutions',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Savvy Roboot - حلول روبوت مبتكرة',
    description: 'منصة روبوت ذكية توفر أحدث التقنيات والحلول المبتكرة',
    images: ['/og-image.jpg'],
    creator: '@savvyrating', // غيّره لحسابك على تويتر
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  applicationName: 'Mr Savvy',
  referrer: 'origin-when-cross-origin',

  alternates: {
    canonical: 'https://savvyworld.ai',
    languages: {
      'ar-SA': 'https://savvyworld.ai/ar',
      'en-US': 'https://savvyworld.ai/en',
    },
  },

  // Verification (اختياري - للتحقق من ملكية الموقع)
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className="overflow-x-hidden">
      <body
        className={`${inter.variable} ${expoArabic.variable} font-sans antialiased overflow-x-hidden`}
      >
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id="
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

          `}
        </Script>
            
        <SmoothScrollProvider>
          <ScrollProgress />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
/****
 * 
 * 
 * 
 * 
 */