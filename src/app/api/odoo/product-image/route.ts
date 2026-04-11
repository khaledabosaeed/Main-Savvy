import { NextResponse } from 'next/server'

import { getOdooHttpError, getProductTemplateImage } from '@/lib/odoo'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const raw = url.searchParams.get('templateId')
    const templateId = raw != null && raw !== '' ? Number(raw) : NaN

    if (!Number.isInteger(templateId) || templateId <= 0) {
      return NextResponse.json(
        { error: 'Invalid templateId', code: 'BAD_REQUEST' },
        { status: 400 }
      )
    }

    const img = await getProductTemplateImage(templateId)
    if (!img) {
      return new NextResponse(null, { status: 404 })
    }

    return new NextResponse(new Uint8Array(img.data), {
      status: 200,
      headers: {
        'Content-Type': img.contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    })
  } catch (err) {
    const { status, error, code } = getOdooHttpError(err)
    console.error('Odoo product image error:', err)
    return NextResponse.json({ error, code }, { status })
  }
}
