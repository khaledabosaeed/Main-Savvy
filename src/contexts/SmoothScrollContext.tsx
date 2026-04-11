'use client';

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (target: string | number, options?: { offset?: number; duration?: number }) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if device is mobile for performance optimization
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // Initialize Lenis with optimized settings
    // Use lighter settings on mobile for better performance
    const lenis = new Lenis({
      duration: isMobile ? 0.6 : 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      smoothWheel: !isMobile, // Disable smooth wheel on mobile for better performance
      wheelMultiplier: 1,
      touchMultiplier: isMobile ? 1.5 : 2, // Lighter touch multiplier on mobile
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync ScrollTrigger positions with Lenis on every scroll event
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so both share the same frame budget
    // This eliminates the "stuck" jank caused by scrollerProxy conflicts
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0); // Prevents GSAP from skipping frames after tab focus

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const scrollTo = (target: string | number, options?: { offset?: number; duration?: number }) => {
    if (!lenisRef.current) return;

    if (typeof target === 'string') {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? 0,
        duration: options?.duration,
      });
    } else {
      lenisRef.current.scrollTo(target, {
        duration: options?.duration,
      });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
