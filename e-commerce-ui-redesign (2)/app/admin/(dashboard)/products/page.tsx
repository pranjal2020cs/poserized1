'use client'

import { AdminHeader } from '@/components/admin/AdminHeader'
import { ProductTable } from '@/components/admin/ProductTable'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Product {
  _id: string
  name: string
  description?: string
  price: number
  category?: string
  image?: string
  inStock: boolean
  rating?: number
  reviews?: Array<{ user: string; comment: string; rating: number }>
  createdAt: Date
  updatedAt: Date
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <AdminHeader title="Products" description="Manage your product inventory" />

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            All Products ({loading ? '...' : products.length})
          </h2>
          <Link
            href="/admin/products/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Product
          </Link>
        </div>

        {loading && <p className="text-slate-600">Loading products...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}
        {!loading && !error && <ProductTable products={products} />}
      </div>
    </div>
  )
}
