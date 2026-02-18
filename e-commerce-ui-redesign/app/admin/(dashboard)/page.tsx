import { AdminHeader } from '@/components/admin/AdminHeader'
import Link from 'next/link'
import { Package, Plus, TrendingUp } from 'lucide-react'

export const metadata = {
  title: 'Dashboard - Admin Panel',
}

export default function AdminDashboardPage() {
  return (
    <div>
      <AdminHeader
        title="Dashboard"
        description="Manage your products and inventory"
      />

      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            icon={<Package size={24} className="text-blue-500" />}
            label="Total Products"
            value="12"
            description="Active products"
          />
          <StatCard
            icon={<TrendingUp size={24} className="text-emerald-500" />}
            label="Total Value"
            value="$4,956"
            description="Estimated inventory value"
          />
          <StatCard
            icon={<Plus size={24} className="text-purple-500" />}
            label="Quick Action"
            value="Add Product"
            description="Create new item"
            isAction
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Quick Actions</h2>
              <p className="text-slate-600">Manage your product catalog</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link
              href="/admin/products"
              className="group p-6 border border-slate-200 rounded-lg hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">View All Products</h3>
                  <p className="text-sm text-slate-600">Browse and manage inventory</p>
                </div>
                <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            <Link
              href="/admin/products/create"
              className="group p-6 border border-slate-200 rounded-lg hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg mb-1">Add New Product</h3>
                  <p className="text-sm text-slate-600">Create and upload items</p>
                </div>
                <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-8 shadow-lg text-white">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold mb-3">Welcome Back</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              You have full control over your product catalog. Add new items, update images, manage pricing, and track your inventory all from this dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/admin/products/create"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition-colors text-center"
              >
                Add New Product
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-blue-800 text-white border border-blue-500 rounded-lg hover:bg-blue-900 font-semibold transition-colors text-center"
              >
                View Public Site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  description: string
  isAction?: boolean
}

function StatCard({ icon, label, value, description, isAction }: StatCardProps) {
  if (isAction) {
    return (
      <Link
        href="/admin/products/create"
        className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          {icon}
        </div>
        <h3 className="text-sm font-medium text-slate-600 mb-1">{label}</h3>
        <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </Link>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-3">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-slate-600 mb-1">{label}</h3>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  )
}
