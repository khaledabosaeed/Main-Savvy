'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { NormalizedOdooProduct } from '@/types/odoo'
import OdooProductCard from './OdooProductCard'

interface OdooProductCarouselProps {
  products: NormalizedOdooProduct[]
  lang: string
  buyLabel?: string
  currency?: string
}

export default function OdooProductCarousel({
  products,
  lang,
  buyLabel = 'Buy now',
  currency = 'SAR',
}: OdooProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isRTL = lang === 'ar'

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollPrev(Math.abs(scrollLeft) > 4)
    setCanScrollNext(Math.abs(scrollLeft) < scrollWidth - clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollButtons()
    el.addEventListener('scroll', updateScrollButtons, { passive: true })
    const ro = new ResizeObserver(updateScrollButtons)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', updateScrollButtons)
      ro.disconnect()
    }
  }, [updateScrollButtons])

  function scrollByCard(direction: 'prev' | 'next') {
    const el = scrollRef.current
    if (!el) return
    const gap = 24
    const child = el.firstElementChild as HTMLElement | null
    const cardWidth = child ? child.getBoundingClientRect().width + gap : 320
    const forward = direction === 'next' ? 1 : -1
    const delta = isRTL ? -forward * cardWidth : forward * cardWidth
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }

  if (products.length === 0) return null

  return (
    <div className="relative px-2">
      {/* Prev button */}
      <button
        type="button"
        onClick={() => scrollByCard('prev')}
        disabled={!canScrollPrev}
        aria-label={isRTL ? 'التالي' : 'Previous'}
        className="absolute -left-4 top-1/2 z-10 -translate-y-8 rounded-full border border-neutral-200 bg-white p-2.5 shadow-md transition hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-0 md:-left-6"
      >
        <ChevronLeft className="h-5 w-5 text-neutral-700" />
      </button>

      {/* Scrollable cards track */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[82%] shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <OdooProductCard
              product={product}
              buyLabel={buyLabel}
              currency={currency}
              href={`/${lang}/odoo-products/${product.id}`}
            />
          </div>
        ))}
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={() => scrollByCard('next')}
        disabled={!canScrollNext}
        aria-label={isRTL ? 'السابق' : 'Next'}
        className="absolute -right-4 top-1/2 z-10 -translate-y-8 rounded-full border border-neutral-200 bg-white p-2.5 shadow-md transition hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-0 md:-right-6"
      >
        <ChevronRight className="h-5 w-5 text-neutral-700" />
      </button>

      {/* Dot indicators */}
      {products.length > 1 && (
        <div className="mt-2 flex justify-center gap-1.5">
          {products.map((p) => (
            <div
              key={p.id}
              className="h-1.5 w-1.5 rounded-full bg-neutral-300"
            />
          ))}
        </div>
      )}
    </div>
  )
}
