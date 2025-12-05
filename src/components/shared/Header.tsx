'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';
import { FaGlobe } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import LanguageLoadingScreen from './LanguageLoadingScreen';

const Header: React.FC = () => {
  const { language, t } = useLanguage();
  const { getLocalizedPath, switchLanguage } = useLocalizedPath();

  const navItems = [
    { key: 'nav.expo', href: getLocalizedPath('/expo') },
    { key: 'nav.innovation', href: getLocalizedPath('/innovation') },
    { key: 'nav.media', href: getLocalizedPath('/media') },
    { key: 'nav.contact', href: getLocalizedPath('/contact') },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  const toggleLanguage = () => {
    setIsChangingLanguage(true);
    const newLang = language === 'en' ? 'ar' : 'en';

    // تأخير لعرض الأنميشن قبل التغيير
    setTimeout(() => {
      switchLanguage(newLang);
    }, 1500); // زيادة الوقت من 500ms إلى 1500ms
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      html.lang = language === 'ar' ? 'ar' : 'en';
      html.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      // يتغير النافبار عند السكرول لأسفل
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    // تحقق عند التحميل أيضاً
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <LanguageLoadingScreen isVisible={isChangingLanguage} />

      {/* Main Navigation - Fixed with Transparent to Opaque Transition */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/70 backdrop-blur-2xl shadow-lg border-b border-gray-200/50'
            : 'bg-transparent backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-auto py-1.5 sm:py-2 md:py-2.5">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href={getLocalizedPath('/')} aria-label="Go to home">
                <Image
                  src="/header/Savvy 2 1.svg"
                  alt="Savvy Logo"
                  width={100}
                  height={100}
                  priority
                  className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] transition-all duration-300"
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className={`hidden md:flex items-center ${language === 'ar' ? 'space-x-reverse space-x-6 lg:space-x-8' : 'space-x-6 lg:space-x-8'}`}>
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`text-sm lg:text-base font-medium transition-all duration-300 ease-in-out hover:scale-105 whitespace-nowrap ${
                    scrolled
                      ? 'text-foreground hover:text-primary'
                      : 'text-foreground/80 hover:text-foreground'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>

            {/* Right Side - Booking Button, Language Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2">
    

              <button
                type="button"
                onClick={toggleLanguage}
                className={`relative hover:scale-105 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ease-in-out border flex items-center justify-center ${
                  scrolled
                    ? 'text-foreground hover:text-primary hover:bg-primary/5 border-gray-300 hover:border-primary'
                    : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5 border-foreground/30 hover:border-foreground/50'
                }`}
              >
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <FaGlobe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{language === 'ar' ? 'EN' : 'ع'}</span>
                </span>
              </button>

     
            </div>
          </div>
          <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden pb-2 bg-white/90 backdrop-blur-lg rounded-b-lg shadow-lg"
            >
              <nav className="space-y-0.5 py-1.5 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 ease-in-out font-medium text-center"
                  >
                    {t(item.key)}
                  </Link>
                ))}
                
                {/* Mobile Book Robot Button */}
                <motion.button
                  onClick={() => {
                    setMobileOpen(false);
                  }}
                  className="w-full px-3 py-2.5 rounded-lg text-sm bg-primary text-white hover:bg-primary/90 transition-all duration-300 ease-in-out font-medium text-center flex items-center justify-center gap-2 shadow-md"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: navItems.length * 0.05, ease: 'easeOut' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {language === 'ar' ? 'احجز روبوت' : 'Book Robot'}
                </motion.button>
              </nav>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};

export default Header;
