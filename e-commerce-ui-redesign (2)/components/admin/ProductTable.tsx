'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Edit, Trash2 } from 'lucide-react'
import { Product } from '@/lib/products-db'
import { useState } from 'react'

interface ProductTableProps {
  products: Product[]
}

export function ProductTable({ products }: ProductTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string | undefined) => {
    if (!id) return

    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    setDeletingId(id)

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        alert('Failed to delete product')
        setDeletingId(null)
        return
      }

      router.refresh()
    } catch (error) {
      console.error('Delete error:', error)
      alert('An error occurred while deleting the product')
      setDeletingId(null)
    }
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
        <p className="text-slate-600 text-lg">No products found</p>
        <Link
          href="/admin/products/create"
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create First Product
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Category</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Price</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={String(product._id)} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="px-6 py-4 text-sm">
                  <div className="relative w-12 h-12 bg-slate-100 rounded border border-slate-200 overflow-hidden">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <span className="text-xs">No image</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">{product.name}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{product.category || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      product.inStock
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/${product._id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit product"
                    >
                      <Edit size={16} />
                      <span className="hidden sm:inline text-xs">Edit</span>
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id as string)}
                      disabled={deletingId === product._id}
                      className="inline-flex items-center gap-1 px-3 py-1 text-red-600 hover:bg-red-50 disabled:opacity-50 rounded transition-colors"
                      title="Delete product"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline text-xs">
                        {deletingId === product._id ? 'Deleting...' : 'Delete'}
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
