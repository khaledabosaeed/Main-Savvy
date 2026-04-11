import { NextResponse } from 'next/server'

import { getOdooHttpError, getProducts, getProductsByNamePrefix } from '@/lib/odoo'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const namePrefix = new URL(request.url).searchParams.get('namePrefix')

    if (namePrefix != null && namePrefix !== '') {
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

    const products = await getProducts()
    return NextResponse.json({ products }, { status: 200 })
  } catch (err) {
    const { status, error, code } = getOdooHttpError(err)
    console.error('Odoo products error:', err)
    return NextResponse.json({ error, code }, { status })
  }
}
