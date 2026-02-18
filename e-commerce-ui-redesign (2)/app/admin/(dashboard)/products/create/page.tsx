'use client'

import { AdminHeader } from '@/components/admin/AdminHeader'
import { ProductForm } from '@/components/admin/ProductForm'

export default function CreateProductPage() {
  return (
    <div>
      <AdminHeader title="Create Product" description="Add a new product to your inventory" />

      <div className="p-8">
        <ProductForm />
      </div>
    </div>
  )
}
