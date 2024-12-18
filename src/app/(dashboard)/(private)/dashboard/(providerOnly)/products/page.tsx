import { getProducts } from '@/app/actions/product'
import { ProductsTable } from './_components/ProductsTable'

export default async function Products() {
  const products = await getProducts()

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Products</h1>
      </div>
      <ProductsTable data={products} />
    </div>
  )
}
