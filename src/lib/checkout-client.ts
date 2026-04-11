'use client'

export type CheckoutResult =
  | { ok: true; internalOrderId?: string }
  | { ok: false; error: string }

export type TestOrderResult =
  | { ok: true; odooOrderId: number; internalOrderId: string }
  | { ok: false; error: string }

export async function startOdooCheckout(productId: number): Promise<CheckoutResult> {
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    })

    const data = (await res.json()) as {
      url?: string
      internalOrderId?: string
      error?: string
    }

    if (!res.ok) {
      return { ok: false, error: data.error ?? 'Checkout failed' }
    }

    if (data.url) {
      window.location.href = data.url
      return { ok: true, internalOrderId: data.internalOrderId }
    }

    return { ok: false, error: 'No checkout URL returned' }
  } catch {
    return { ok: false, error: 'Network error' }
  }
}

export async function createOdooTestOrder(
  productId: number,
  email?: string
): Promise<TestOrderResult> {
  try {
    const res = await fetch('/api/odoo/test-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, ...(email ? { email } : {}) }),
    })

    const data = (await res.json()) as {
      odooOrderId?: number
      internalOrderId?: string
      error?: string
    }

    if (!res.ok) {
      return { ok: false, error: data.error ?? 'Test order failed' }
    }

    if (
      typeof data.odooOrderId === 'number' &&
      typeof data.internalOrderId === 'string'
    ) {
      return {
        ok: true,
        odooOrderId: data.odooOrderId,
        internalOrderId: data.internalOrderId,
      }
    }

    return { ok: false, error: 'Invalid response' }
  } catch {
    return { ok: false, error: 'Network error' }
  }
}
