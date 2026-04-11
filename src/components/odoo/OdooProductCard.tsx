'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { NormalizedOdooProduct } from '@/types/odoo'
import { showTestOrderButton } from '@/lib/allow-test-orders'
import { createOdooTestOrder, startOdooCheckout } from '@/lib/checkout-client'

export interface OdooProductCardProps {
  product: NormalizedOdooProduct
  buyLabel?: string
  testOrderLabel?: string
  currency?: string
  /** Optional URL — wraps the image and title in a link to the product detail page */
  href?: string
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
  testOrderLabel = 'Create Test Order',
  currency = 'SAR',
  href,
}: OdooProductCardProps) {
  const [loading, setLoading] = useState(false)
  const [testLoading, setTestLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testMessage, setTestMessage] = useState<string | null>(null)

  const canBuy =
    typeof product.listPrice === 'number' &&
    Number.isFinite(product.listPrice) &&
    product.listPrice > 0

  async function handleBuy() {
    setError(null)
    setTestMessage(null)
    setLoading(true)
    const result = await startOdooCheckout(product.id)
    setLoading(false)
    if (!result.ok) {
      setError(result.error)
    }
  }

  async function handleTestOrder() {
    setError(null)
    setTestMessage(null)
    setTestLoading(true)
    const result = await createOdooTestOrder(product.id)
    setTestLoading(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setTestMessage(`Draft order #${result.odooOrderId} (${result.internalOrderId.slice(0, 8)}…)`)
  }

  const showTest = showTestOrderButton()

  const imageBlock = (
    <div className="relative -mx-6 -mt-6 mb-4 aspect-square w-[calc(100%+3rem)] overflow-hidden rounded-t-2xl bg-neutral-100">
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.name || 'Product'}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <div className="flex h-full min-h-[200px] w-full items-center justify-center text-sm text-neutral-400">
          —
        </div>
      )}
    </div>
  )

  return (
    <article className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {href ? (
        <Link href={href} className="focus:outline-none">
          {imageBlock}
          <h2 className="text-lg font-semibold text-neutral-900 hover:text-[#3960F9] transition-colors">
            {product.name}
          </h2>
        </Link>
      ) : (
        <>
          {imageBlock}
          <h2 className="text-lg font-semibold text-neutral-900">{product.name}</h2>
        </>
      )}
      {product.descriptionSale ? (
        <p className="mt-3 line-clamp-3 text-sm text-neutral-600">{product.descriptionSale}</p>
      ) : null}
      <p className="mt-4 text-2xl font-bold text-neutral-900">
        {canBuy ? formatPrice(product.listPrice!, currency) : '—'}
      </p>
      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          disabled={!canBuy || loading}
          onClick={handleBuy}
          className="w-full rounded-xl bg-[#3960F9] px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2848C7] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Redirecting…' : buyLabel}
        </button>
        {showTest ? (
          <button
            type="button"
            disabled={!canBuy || testLoading || loading}
            onClick={handleTestOrder}
            className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-center text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {testLoading ? 'Creating…' : testOrderLabel}
          </button>
        ) : null}
        {error ? <p className="mt-2 text-center text-sm text-red-600">{error}</p> : null}
        {testMessage ? (
          <p className="text-center text-sm text-green-700">{testMessage}</p>
        ) : null}
      </div>
    </article>
  )
}
