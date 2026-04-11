import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProductById } from '@/lib/odoo'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const { productId } = await req.json()

    const product = await getProductById(productId)

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.descriptionSale || undefined,
            },
            unit_amount: Math.round((product.listPrice ?? 0) * 100),
          },
          quantity: 1,
        },
      ],
      customer_creation: 'always',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      client_reference_id: String(product.id),
      metadata: {
        odoo_product_id: String(product.id),
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}