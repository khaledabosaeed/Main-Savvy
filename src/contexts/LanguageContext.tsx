'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation keys
const translations = {
en: {
  // Header
  'nav.expo': 'Expo',
  'nav.innovation': 'Innovation',
  'nav.media': 'Media',
  'nav.contact': 'Contact',
    'nav.language': 'العربية',

    // Navigation items
    'about': 'About',
    'pricing': 'Pricing',
    'steps': 'Steps',
    
    // Hero Section
    'hero.title': 'Welcome to Our Platform',
    'hero.subtitle': 'Building the future with innovative solutions',
    'hero.cta': 'Get Started',
    'hero.learn': 'Learn More',
    
    // About Section
    'about.title': 'About Us',
    'about.description': 'We are a team of passionate professionals dedicated to delivering exceptional results.',
    
    // Services Section
    'services.title': 'Our Services',
    'services.desc': 'Comprehensive solutions tailored to your needs',
    
    // Contact Section
    'contact.title': 'Get In Touch',
    'contact.desc': 'Ready to start your project?',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    
    // Footer
    'footer.rights': 'All rights reserved.',
  },
  ar: {
    // Header
    'nav.expo': 'المعارض',
    'nav.innovation': 'الابتكار',
    'nav.media': 'الإعلام',
    'nav.contact': 'تواصل معنا',
    'nav.language': 'English',

    // Navigation items
    'about': 'من نحن',
    'pricing': 'الأسعار',
    'steps': 'الخطوات',
    
    // Hero Section
    'hero.title': 'مرحباً بكم في منصتنا',
    'hero.subtitle': 'نبني المستقبل بحلول مبتكرة',
    'hero.cta': 'ابدأ الآن',
    'hero.learn': 'اعرف المزيد',
    
    // About Section
    'about.title': 'من نحن',
    'about.description': 'نحن فريق من المهنيين المتحمسين المكرسين لتقديم نتائج استثنائية.',
    
    // Services Section
    'services.title': 'خدماتنا',
    'services.desc': 'حلول شاملة مصممة خصيصاً لاحتياجاتك',
    
    // Contact Section
    'contact.title': 'تواصل معنا',
    'contact.desc': 'مستعد لبدء مشروعك؟',
    'contact.email': 'البريد الإلكتروني',
    'contact.phone': 'الهاتف',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال الرسالة',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, initialLanguage = 'en' }) => {
  const [language, setLanguage] = useState<Language>(initialLanguage);

  const handleLanguageChange = (lang: Language) => {
    if (lang === language) return;
    
    // Simply change language and reload the page
    setLanguage(lang);
    
    // Reload page to re-trigger all animations
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage: handleLanguageChange,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Client-side effect component to sync lang/dir and body class with current language
export const LanguageEffects: React.FC = () => {
  const { language } = useLanguage();
  React.useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('lang-ar', language === 'ar');
    document.body.classList.toggle('lang-en', language === 'en');
  }, [language]);
  return null;
};
