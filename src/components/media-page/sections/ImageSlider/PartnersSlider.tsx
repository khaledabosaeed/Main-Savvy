'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { partnersContent } from './content';

export interface ImageItem {
  name: string;
  logo: string;
}

interface ImageSliderProps {
  images: ImageItem[];
  heading?: string;
}

const ImageSlider = ({ images, heading }: ImageSliderProps) => {
    const { language } = useLanguage()
    const content = partnersContent[language as keyof typeof partnersContent] || partnersContent.en
    const displayHeading = heading || content.heading;

   // Double the array for seamless loop
  const duplicatedPartners = [...images, ...images];

  // Animation with continuous scrolling
  const baseX = useMotionValue(0);
  const scrollSpeed = -50; // Pixels per second (negative = left, positive = right) - increased speed

  useAnimationFrame((_t, delta) => {
    const moveBy = (scrollSpeed * delta) / 1000;
    baseX.set(baseX.get() + moveBy);
  });

  // Get container width dynamically
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidth = 200; // Approximate width including gap
  const totalWidth = images.length * itemWidth;

  // Create seamless loop by resetting position
  useEffect(() => {
    const unsubscribe = baseX.on('change', (latest) => {
      if (latest <= -totalWidth) {
        baseX.set(0);
      }
    });
    return () => unsubscribe();
  }, [baseX, totalWidth]);

  const x = useTransform(baseX, (v) => `${v}px`);

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-foreground">
            {displayHeading}
          </h2>
        </motion.div>

        {/* Sliding Partners */}
        <div className="relative" dir="ltr">
          <div className="overflow-hidden" ref={containerRef}>
            <motion.div
              className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-10 items-center will-change-transform"
              style={{ x, transform: 'translateZ(0)' }}
            >
              {duplicatedPartners.map((partner, index) => {
                // Custom sizes for specific partners
             

                return (  
                  <div
                    key={`${partner.name}-${index}`}
                        className="relative shrink-0 w-[200px] md:w-[300px] h-[120px] md:h-[180px] mx-2 rounded-lg overflow-hidden bg-gray-200"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 200px, 300px"
                    />
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 h-full w-20 sm:w-32 bg-linear-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 h-full w-20 sm:w-32 bg-linear-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
};

export default ImageSlider;