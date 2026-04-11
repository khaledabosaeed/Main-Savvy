'use client'

import { useState } from 'react'
import type { NormalizedOdooProduct } from '@/types/odoo'
import { startOdooCheckout } from '@/lib/checkout-client'

export interface OdooProductCardProps {
  product: NormalizedOdooProduct
  buyLabel?: string
  currency?: string
}

function formatPrice(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${amount} ${currency}`
  }
}

export default function OdooProductCard({
  product,
  buyLabel = 'Buy',
  currency = 'SAR',
}: OdooProductCardProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canBuy =
    typeof product.listPrice === 'number' &&
    Number.isFinite(product.listPrice) &&
    product.listPrice > 0

  async function handleBuy() {
    setError(null)
    setLoading(true)
    const result = await startOdooCheckout(product.id)
    setLoading(false)
    if (!result.ok) {
      setError(result.error)
    }
  }

  return (
    <article className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h2 className="text-lg font-semibold text-neutral-900">{product.name}</h2>
      {product.defaultCode ? (
        <p className="mt-1 text-sm text-neutral-500">{product.defaultCode}</p>
      ) : null}
      {product.descriptionSale ? (
        <p className="mt-3 line-clamp-3 text-sm text-neutral-600">{product.descriptionSale}</p>
      ) : null}
      <p className="mt-4 text-2xl font-bold text-neutral-900">
        {canBuy ? formatPrice(product.listPrice!, currency) : '—'}
      </p>
      <div className="mt-6">
        <button
          type="button"
          disabled={!canBuy || loading}
          onClick={handleBuy}
          className="w-full rounded-xl bg-[#3960F9] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2848C7] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Redirecting…' : buyLabel}
        </button>
        {error ? <p className="mt-2 text-center text-sm text-red-600">{error}</p> : null}
      </div>
    </article>
  )
}
