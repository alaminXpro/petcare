'use client'

import { useState, useEffect, useRef } from 'react'

// Hook Imports

import { ProductType } from '@prisma/client'
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Box, Container } from '@mui/material'

import { useIntersection } from '@/hooks/useIntersection'

import { ProductCard } from '@/components/product-card'
import type { Product } from '@/types'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [productType, setProductType] = useState<ProductType | ''>('')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      try {
        const params = new URLSearchParams()

        if (searchQuery) params.append('search', searchQuery)
        if (productType) params.append('productType', productType)

        const res = await fetch(`/api/products?${params.toString()}`)
        const data = await res.json()

        if (data.success) {
          setProducts(data.products)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    // Debounce search
    const timeoutId = setTimeout(fetchProducts, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, productType])

  // Refs
  const skipIntersection = useRef(true)
  const ref = useRef<null | HTMLDivElement>(null)

  // Hooks
  const { updateIntersections } = useIntersection()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (skipIntersection.current) {
          skipIntersection.current = false

          return
        }

        updateIntersections({ [entry.target.id]: entry.isIntersecting })
      },
      { threshold: 0.35 }
    )

    ref.current && observer.observe(ref.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.title = 'Products | PetCare'
  }, [])

  return (
    <Container id='products' maxWidth='xl' sx={{ py: 6 }} ref={ref}>
      <h1 className='text-3xl font-bold mb-12 text-center'>Our Products</h1>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder='Search by name, brand, or tags...'
              size='small'
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size='small'>
              <InputLabel>Product Type</InputLabel>
              <Select
                value={productType}
                label='Product Type'
                onChange={e => setProductType(e.target.value as ProductType | '')}
              >
                <MenuItem value=''>All</MenuItem>
                {Object.values(ProductType).map(type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <div className='text-center'>Loading...</div>
      ) : products.length === 0 ? (
        <p className='text-center text-muted-foreground'>No products available.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {products.map(product => (
            <ProductCard key={product.productId} {...product} />
          ))}
        </div>
      )}
    </Container>
  )
}
