import PageTransition from '@/components/shared/PageTransition/PageTransition'
import UnifiedHeader from '@/components/shared/UnifiedHeader'
import OdooProductCard from '@/components/odoo/OdooProductCard'
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

  return (
    <>
      <UnifiedHeader hasBanner={false} />
      <PageTransition>
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6  ">
          <h1 className="mb-2 text-3xl font-bold text-neutral-900 md:text-4xl">
            {lang === 'ar' ? 'منتجات CNUTR' : 'CNUTR products'}
          </h1>
          <p className="mb-10 text-neutral-600">
            {lang === 'ar'
              ? 'اختر منتجًا للمتابعة إلى الدفع.'
              : 'Choose a product to continue to checkout.'}
          </p>

          {fetchError ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">{fetchError}</p>
          ) : products.length === 0 ? (
            <p className="text-neutral-600">
              {lang === 'ar' ? 'لا توجد منتجات مطابقة.' : 'No matching products.'}
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <li key={product.id}>
                  <OdooProductCard
                    product={product}
                    buyLabel={lang === 'ar' ? 'اشتري الآن' : 'Buy now'}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </PageTransition>
    </>
  )
}
