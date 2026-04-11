import Stripe from 'stripe'
import { headers } from 'next/headers'

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

    const customerEmail = session.customer_details?.email
    const odooProductId = session.metadata?.odoo_product_id

    try {

      console.log('Payment completed', {
        sessionId: session.id,
        customerEmail,
        odooProductId,
      })
    } catch (error) {
      console.error('Post-payment handling failed:', error)
      return new Response('Webhook handling failed', { status: 500 })
    }
  }

  return new Response('ok', { status: 200 })
}