import { NextResponse } from 'next/server'

import {
  getOdooHttpError,
  getProducts,
  getProductsByNamePrefix,
  getProductsByNamePrefixRaw,
  getProductsRaw,
  isOdooRawProductDebugEnabled,
} from '@/lib/odoo'

export const dynamic = 'force-dynamic'

function wantsRaw(searchParams: URLSearchParams): boolean {
  const v = searchParams.get('raw')
  return v === '1' || v === 'true'
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const namePrefix = url.searchParams.get('namePrefix')
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

    if (namePrefix != null && namePrefix !== '') {
      if (raw) {
        const odooRecords = await getProductsByNamePrefixRaw(namePrefix)
        return NextResponse.json({ raw: true as const, odooRecords }, { status: 200 })
      }

      const products = await getProductsByNamePrefix(namePrefix)
      console.log(
        '[Odoo] products matching namePrefix=%s: %s',
        namePrefix.trim(),
        JSON.stringify(
          products.map((p) => ({
            id: p.id,
            name: p.name,
            defaultCode: p.defaultCode,
          }))
        )
      )
      return NextResponse.json({ products }, { status: 200 })
    }

    if (raw) {
      const odooRecords = await getProductsRaw()
      return NextResponse.json({ raw: true as const, odooRecords }, { status: 200 })
    }

    const products = await getProducts()
    return NextResponse.json({ products }, { status: 200 })
  } catch (err) {
    const { status, error, code } = getOdooHttpError(err)
    console.error('Odoo products error:', err)
    return NextResponse.json({ error, code }, { status })
  }
}
