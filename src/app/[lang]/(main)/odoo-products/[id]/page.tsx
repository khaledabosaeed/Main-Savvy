import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import PageTransition from '@/components/shared/PageTransition/PageTransition'
import UnifiedHeader from '@/components/shared/UnifiedHeader'
import OdooProductActions from '@/components/odoo/OdooProductActions'
import { getProductById } from '@/lib/odoo'
import { isAppLanguage } from '@/i18n/settings'

interface ProductPageProps {
  params: Promise<{ lang: string; id: string }>
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params
  const productId = parseInt(id, 10)
  if (!Number.isInteger(productId) || productId <= 0) return {}
  try {
    const product = await getProductById(productId)
    if (!product) return {}
    return { title: product.name }
  } catch {
    return {}
  }
}

export default async function OdooProductDetailPage({ params }: ProductPageProps) {
  const { lang, id } = await params

  if (!isAppLanguage(lang)) notFound()

  const productId = parseInt(id, 10)
  if (!Number.isInteger(productId) || productId <= 0) notFound()

  let product: Awaited<ReturnType<typeof getProductById>> = null
  try {
    product = await getProductById(productId)
  } catch {
    /* handled below */
  }

  if (!product) notFound()

  const isAr = lang === 'ar'

  return (
    <>
      <UnifiedHeader hasBanner={false} />
      <PageTransition>
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
          {/* Back link */}
          <Link
            href={`/${lang}/odoo-products`}
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-800"
          >
            {isAr ? (
              <>
                <ArrowRight className="h-4 w-4" />
                العودة إلى المنتجات
              </>
            ) : (
              <>
                <ArrowLeft className="h-4 w-4" />
                Back to products
              </>
            )}
          </Link>

          {/* Product layout */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain p-6"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-neutral-300">
                  <span className="text-6xl">—</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center gap-6">
              {product.defaultCode && (
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  {product.defaultCode}
                </p>
              )}

              <h1 className="text-3xl font-bold text-neutral-900 md:text-4xl">
                {product.name}
              </h1>

              {product.descriptionSale && (
                <p className="text-base leading-relaxed text-neutral-600">
                  {product.descriptionSale}
                </p>
              )}

              <hr className="border-neutral-100" />

              <OdooProductActions
                product={product}
                buyLabel={isAr ? 'اشتري الآن' : 'Buy now'}
                testOrderLabel={isAr ? 'إنشاء طلب تجريبي' : 'Create Test Order'}
              />
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  )
}
