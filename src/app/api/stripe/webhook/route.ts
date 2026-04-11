import { headers } from 'next/headers'
import Stripe from 'stripe'

import {
  createSaleOrderFromTemplate,
  findSaleOrderIdByStripeSessionId,
  resolvePartnerIdForCheckout,
} from '@/lib/odoo-orders'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')

  if (!signature) {
    return new Response('Missing signature', { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature error:', err)
    return new Response('Invalid signature', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    try {
      const duplicateId = await findSaleOrderIdByStripeSessionId(session.id)
      if (duplicateId != null) {
        return new Response('ok', { status: 200 })
      }

      const odooProductIdRaw = session.metadata?.odoo_product_id
      const internalOrderId =
        session.metadata?.internal_order_id ?? session.client_reference_id ?? null

      if (!odooProductIdRaw || !internalOrderId) {
        console.error('Stripe webhook: missing odoo_product_id or internal_order_id', {
          sessionId: session.id,
        })
        return new Response('ok', { status: 200 })
      }

      const templateId = Number.parseInt(odooProductIdRaw, 10)
      if (!Number.isInteger(templateId) || templateId <= 0) {
        console.error('Stripe webhook: invalid odoo_product_id', odooProductIdRaw)
        return new Response('ok', { status: 200 })
      }

      let partnerId: number
      try {
        const resolved = await resolvePartnerIdForCheckout(session.customer_details?.email)
        partnerId = resolved.partnerId
      } catch (e) {
        console.error('Stripe webhook: cannot resolve partner', e)
        return new Response('ok', { status: 200 })
      }

      const isTest = session.livemode === false

      const { odooOrderId } = await createSaleOrderFromTemplate({
        templateId,
        partnerId,
        internalOrderId,
        stripeCheckoutSessionId: session.id,
        isTest,
        confirmAfterCreate: true,
      })

      console.log('Stripe webhook: Odoo sale.order created', {
        sessionId: session.id,
        internalOrderId,
        odooOrderId,
        isTest,
      })
    } catch (error) {
      console.error('Post-payment Odoo failed:', error)
      return new Response('Webhook handling failed', { status: 500 })
    }
  }

  return new Response('ok', { status: 200 })
}
