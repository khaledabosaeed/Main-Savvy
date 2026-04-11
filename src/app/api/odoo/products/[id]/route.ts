import { NextResponse } from 'next/server'

import {
  getOdooHttpError,
  getProductById,
  getProductByIdRaw,
  isOdooRawProductDebugEnabled,
} from '@/lib/odoo'

export const dynamic = 'force-dynamic'

type RouteContext = { params: Promise<{ id: string }> }

function wantsRaw(searchParams: URLSearchParams): boolean {
  const v = searchParams.get('raw')
  return v === '1' || v === 'true'
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const url = new URL(request.url)
    const raw = wantsRaw(url.searchParams)

    if (raw && !isOdooRawProductDebugEnabled()) {
      return NextResponse.json(
        {
          error:
            'Raw Odoo payloads are disabled. Use NODE_ENV=development or set ODOO_DEBUG_RAW_PRODUCTS=1.',
          code: 'FORBIDDEN',
        },
        { status: 403 }
      )
    }

    const { id: idParam } = await context.params
    const id = Number(idParam)
    if (!Number.isFinite(id) || String(Math.trunc(id)) !== idParam.trim()) {
      return NextResponse.json(
        { error: 'Invalid product id', code: 'BAD_REQUEST' },
        { status: 400 }
      )
    }

    const tid = Math.trunc(id)

    if (raw) {
      const odooRecord = await getProductByIdRaw(tid)
      if (!odooRecord) {
        return NextResponse.json(
          { error: 'Product not found', code: 'NOT_FOUND' },
          { status: 404 }
        )
      }
      return NextResponse.json({ raw: true as const, odooRecord }, { status: 200 })
    }

    const product = await getProductById(tid)
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
