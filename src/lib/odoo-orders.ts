/**
 * Sale orders from the storefront require these custom fields on `sale.order` in Odoo
 * (Settings → Technical → Fields, Studio, or a custom module):
 *
 * - x_internal_order_id (Char) — app-generated UUID
 * - x_stripe_checkout_session_id (Char) — Stripe `cs_...`; empty for non-Stripe test orders
 * - x_is_test (Boolean) — true for test-mode Stripe (`livemode=false`) or “Create Test Order” flow
 */

import { OdooRpcError, odooExecuteKw } from '@/lib/odoo'

function parseOptionalPartnerId(): number | null {
  const raw = process.env.ODOO_ANONYMOUS_PARTNER_ID
  if (raw == null || String(raw).trim() === '') return null
  const n = Number.parseInt(String(raw), 10)
  return Number.isInteger(n) && n > 0 ? n : null
}

export async function findSaleOrderIdByStripeSessionId(
  stripeSessionId: string
): Promise<number | null> {
  const ids = await odooExecuteKw<number[]>(
    'sale.order',
    'search',
    [[['x_stripe_checkout_session_id', '=', stripeSessionId]]],
    { limit: 1 }
  )
  if (!Array.isArray(ids) || ids.length === 0) return null
  const id = ids[0]
  return typeof id === 'number' && id > 0 ? id : null
}

export async function getOrCreatePartnerByEmail(email: string): Promise<number> {
  const normalized = email.trim().toLowerCase()
  if (!normalized) {
    throw new OdooRpcError('Customer email is required to create a partner')
  }

  const found = await odooExecuteKw<number[]>(
    'res.partner',
    'search',
    [[['email', '=', normalized]]],
    { limit: 1 }
  )
  if (Array.isArray(found) && found.length > 0 && typeof found[0] === 'number') {
    return found[0]!
  }

  const local = normalized.split('@')[0] || 'Web customer'
  const created = await odooExecuteKw<number>('res.partner', 'create', [
    {
      name: local,
      email: normalized,
    },
  ])
  if (typeof created !== 'number' || !Number.isFinite(created)) {
    throw new OdooRpcError('Unexpected res.partner create result')
  }
  return created
}

export async function resolvePartnerIdForCheckout(customerEmail: string | null | undefined): Promise<{
  partnerId: number
  usedAnonymousFallback: boolean
}> {
  const trimmed = customerEmail?.trim()
  if (trimmed) {
    const partnerId = await getOrCreatePartnerByEmail(trimmed)
    return { partnerId, usedAnonymousFallback: false }
  }
  const anon = parseOptionalPartnerId()
  if (anon != null) {
    return { partnerId: anon, usedAnonymousFallback: true }
  }
  throw new OdooRpcError('Missing customer email and ODOO_ANONYMOUS_PARTNER_ID is not set')
}

export async function getProductVariantIdForTemplate(templateId: number): Promise<number> {
  const ids = await odooExecuteKw<number[]>(
    'product.product',
    'search',
    [[['product_tmpl_id', '=', templateId]]],
    { limit: 1 }
  )
  if (!Array.isArray(ids) || ids.length === 0 || typeof ids[0] !== 'number') {
    throw new OdooRpcError(`No product variant for template id ${templateId}`)
  }
  return ids[0]!
}

export type CreateSaleOrderParams = {
  templateId: number
  partnerId: number
  internalOrderId: string
  stripeCheckoutSessionId: string | null
  isTest: boolean
  /** If true, confirm the quotation after create (paid Stripe flow). */
  confirmAfterCreate: boolean
}

export async function createSaleOrderFromTemplate(
  params: CreateSaleOrderParams
): Promise<{ odooOrderId: number }> {
  const productId = await getProductVariantIdForTemplate(params.templateId)

  const vals: Record<string, unknown> = {
    partner_id: params.partnerId,
    order_line: [
      [
        0,
        0,
        {
          product_id: productId,
          product_uom_qty: 1,
        },
      ],
    ],
    x_internal_order_id: params.internalOrderId,
    x_is_test: params.isTest,
  }
  if (params.stripeCheckoutSessionId) {
    vals.x_stripe_checkout_session_id = params.stripeCheckoutSessionId
  }

  const odooOrderId = await odooExecuteKw<number>('sale.order', 'create', [vals])
  if (typeof odooOrderId !== 'number' || !Number.isFinite(odooOrderId)) {
    throw new OdooRpcError('Unexpected sale.order create result')
  }

  if (params.confirmAfterCreate) {
    await odooExecuteKw<boolean | number>('sale.order', 'action_confirm', [[odooOrderId]])
  }

  return { odooOrderId }
}
