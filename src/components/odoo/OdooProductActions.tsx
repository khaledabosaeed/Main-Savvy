'use client'

import { useState } from 'react'
import type { NormalizedOdooProduct } from '@/types/odoo'
import { showTestOrderButton } from '@/lib/allow-test-orders'
import { createOdooTestOrder, startOdooCheckout } from '@/lib/checkout-client'

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

interface OdooProductActionsProps {
  product: NormalizedOdooProduct
  buyLabel?: string
  testOrderLabel?: string
  currency?: string
}

export default function OdooProductActions({
  product,
  buyLabel = 'Buy now',
  testOrderLabel = 'Create Test Order',
  currency = 'SAR',
}: OdooProductActionsProps) {
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
    if (!result.ok) setError(result.error)
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

  return (
    <div className="flex flex-col gap-4">
      <p className="text-3xl font-bold text-neutral-900 md:text-4xl">
        {canBuy ? formatPrice(product.listPrice!, currency) : '—'}
      </p>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          disabled={!canBuy || loading}
          onClick={handleBuy}
          className="rounded-xl bg-[#3960F9] px-6 py-3.5 text-center text-base font-semibold text-white transition-colors hover:bg-[#2848C7] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Redirecting…' : buyLabel}
        </button>

        {showTest ? (
          <button
            type="button"
            disabled={!canBuy || testLoading || loading}
            onClick={handleTestOrder}
            className="rounded-xl border border-neutral-300 bg-neutral-50 px-6 py-3.5 text-center text-base font-semibold text-neutral-800 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {testLoading ? 'Creating…' : testOrderLabel}
          </button>
        ) : null}

        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {testMessage ? <p className="text-sm text-green-700">{testMessage}</p> : null}
      </div>
    </div>
  )
}
