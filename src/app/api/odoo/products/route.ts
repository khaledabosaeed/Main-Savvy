import { NextResponse } from 'next/server'

import { getOdooHttpError, getProducts } from '@/lib/odoo'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json({ products }, { status: 200 })
  } catch (err) {
    const { status, error, code } = getOdooHttpError(err)
    console.error('Odoo products error:', err)
    return NextResponse.json({ error, code }, { status })
  }
}
