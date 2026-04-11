import PageTransition from '@/components/shared/PageTransition/PageTransition'
import UnifiedHeader from '@/components/shared/UnifiedHeader'
import OdooProductCarousel from '@/components/odoo/OdooProductCarousel'
import { getProductsByNamePrefix } from '@/lib/odoo'
import { isAppLanguage } from '@/i18n/settings'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ lang: string }>
}

export default async function OdooProductsPage({ params }: PageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }

  let products: Awaited<ReturnType<typeof getProductsByNamePrefix>> = []
  let fetchError: string | null = null

  try {
    products = await getProductsByNamePrefix('CNUTR')
  } catch {
    fetchError = lang === 'ar' ? 'تعذر تحميل المنتجات.' : 'Could not load products.'
  }

  const isAr = lang === 'ar'

  return (
    <>
      <UnifiedHeader hasBanner={false} />
      <PageTransition>
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
          <h1 className="mb-2 text-3xl font-bold text-neutral-900 md:text-4xl">
            {isAr ? 'منتجات CNUTR' : 'CNUTR Products'}
          </h1>
          <p className="mb-10 text-neutral-600">
            {isAr
              ? 'تصفح منتجاتنا — انقر على المنتج لمزيد من التفاصيل أو اشترِ الآن مباشرةً.'
              : 'Browse our products — click a product for details or buy directly.'}
          </p>

          {fetchError ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
              {fetchError}
            </p>
          ) : products.length === 0 ? (
            <p className="text-neutral-600">
              {isAr ? 'لا توجد منتجات مطابقة.' : 'No matching products.'}
            </p>
          ) : (
            <OdooProductCarousel
              products={products}
              lang={lang}
              buyLabel={isAr ? 'اشتري الآن' : 'Buy now'}
            />
          )}
        </div>
      </PageTransition>
    </>
  )
}
