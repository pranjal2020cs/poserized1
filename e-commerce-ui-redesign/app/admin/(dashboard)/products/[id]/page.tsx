'use client'

import { AdminHeader } from '@/components/admin/AdminHeader'
import { ProductForm } from '@/components/admin/ProductForm'
import { useParams } from 'next/navigation'
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

export default function EditProductPage() {
  const params = useParams()
  const id = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${id}`)
        if (!response.ok) {
          throw new Error('Product not found')
        }
        const data = await response.json()
        setProduct(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (loading) {
    return (
      <div>
        <AdminHeader title="Loading..." description="" />
        <div className="p-8">
          <p className="text-slate-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div>
        <AdminHeader title="Error" description="" />
        <div className="p-8">
          <p className="text-red-600">Error: {error || 'Product not found'}</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AdminHeader title={`Edit: ${product.name}`} description="Update product details" />

      <div className="p-8">
        <ProductForm product={product} />
      </div>
    </div>
  )
}
