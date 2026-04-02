import { NextResponse } from 'next/server'

import {
  getOdooHttpError,
  login,
  OdooAuthError,
} from '@/lib/odoo'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const userId = await login()
    return NextResponse.json({ success: true, userId }, { status: 200 })
  } catch (err) {
    if (err instanceof OdooAuthError) {
      console.error('Odoo test: authentication failed')
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 401 }
      )
    }
    const { status, error, code } = getOdooHttpError(err)
    console.error('Odoo test error:', err)
    return NextResponse.json({ success: false, error, code }, { status })
  }
}
