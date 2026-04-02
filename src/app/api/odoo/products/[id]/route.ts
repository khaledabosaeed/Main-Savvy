import { NextResponse } from 'next/server'

import { getOdooHttpError, getProductById } from '@/lib/odoo'

export const dynamic = 'force-dynamic'

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id: idParam } = await context.params
    const id = Number(idParam)
    if (!Number.isFinite(id) || String(Math.trunc(id)) !== idParam.trim()) {
      return NextResponse.json(
        { error: 'Invalid product id', code: 'BAD_REQUEST' },
        { status: 400 }
      )
    }

    const product = await getProductById(Math.trunc(id))
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found', code: 'NOT_FOUND' },
        { status: 404 }
      )
    }

    return NextResponse.json({ product }, { status: 200 })
  } catch (err) {
    const { status, error, code } = getOdooHttpError(err)
    console.error('Odoo product by id error:', err)
    return NextResponse.json({ error, code }, { status })
  }
}
