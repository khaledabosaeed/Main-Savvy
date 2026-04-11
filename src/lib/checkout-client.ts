'use client'

export type CheckoutResult =
  | { ok: true }
  | { ok: false; error: string }

export async function startOdooCheckout(productId: number): Promise<CheckoutResult> {
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId }),
    })

    const data = (await res.json()) as { url?: string; error?: string }

    if (!res.ok) {
      return { ok: false, error: data.error ?? 'Checkout failed' }
    }

    if (data.url) {
      window.location.href = data.url
      return { ok: true }
    }

    return { ok: false, error: 'No checkout URL returned' }
  } catch {
    return { ok: false, error: 'Network error' }
  }
}
