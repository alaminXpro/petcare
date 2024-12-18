import { ProductCard } from '@/components/product-card'
import type { ProductsApiResponse, Product } from '@/types'

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data: ProductsApiResponse = await res.json()

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch products')
    }

    return data.products
  } catch (error) {
    console.error('Failed to fetch products:', error)

    return []
  }
}

export default async function Products() {
  const products = await getProducts()

  return (
    <div className='container mx-auto py-12 px-4 max-w-7xl'>
      <h1 className='text-3xl font-bold mb-12 text-center'>Our Products</h1>
      {products.length === 0 ? (
        <p className='text-center text-muted-foreground'>No products available.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {products.map(product => (
            <ProductCard key={product.productId} {...product} />
          ))}
        </div>
      )}
    </div>
  )
}
