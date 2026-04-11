import { randomUUID } from 'crypto'

import { NextResponse } from 'next/server'

import { allowTestOrders } from '@/lib/allow-test-orders'
import { getOdooHttpError, getProductById, OdooRpcError } from '@/lib/odoo'
import { createSaleOrderFromTemplate, resolvePartnerIdForCheckout } from '@/lib/odoo-orders'

export async function POST(req: Request) {
  if (!allowTestOrders()) {
    return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  }

  try {
    const body = (await req.json()) as { productId?: unknown; email?: unknown }
    const productId = body.productId
    const emailFromBody =
      typeof body.email === 'string' && body.email.trim() !== ''
        ? body.email.trim()
        : undefined
    const rawTestEmail = process.env.ODOO_TEST_ORDER_EMAIL
    const emailFromEnv =
      typeof rawTestEmail === 'string' && rawTestEmail.trim() !== ''
        ? rawTestEmail.trim()
        : undefined
    const email = emailFromBody ?? emailFromEnv

    if (typeof productId !== 'number' || !Number.isInteger(productId) || productId <= 0) {
      return NextResponse.json({ error: 'Invalid productId' }, { status: 400 })
    }

    const product = await getProductById(productId)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const internalOrderId = randomUUID()
    const { partnerId } = await resolvePartnerIdForCheckout(email ?? null)

    const { odooOrderId } = await createSaleOrderFromTemplate({
      templateId: product.id,
      partnerId,
      internalOrderId,
      stripeCheckoutSessionId: null,
      isTest: true,
      confirmAfterCreate: false,
    })

    return NextResponse.json({
      odooOrderId,
      internalOrderId,
      name: product.name,
    })
  } catch (err) {
    if (
      err instanceof OdooRpcError &&
      err.message.includes('Missing customer email')
    ) {
      return NextResponse.json(
        {
          error:
            'Set ODOO_ANONYMOUS_PARTNER_ID, or ODOO_TEST_ORDER_EMAIL, or include an "email" field in the JSON body.',
          code: 'PARTNER',
        },
        { status: 400 }
      )
    }
    const { status, error, code } = getOdooHttpError(err)
    return NextResponse.json({ error, code }, { status })
  }
}
