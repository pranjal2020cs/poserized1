'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut, LayoutDashboard, Package, Plus, Settings } from 'lucide-react'
import { useState } from 'react'

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const isActive = (path: string) => pathname.startsWith(path)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Clear session by navigating to login
      // In a real app, you'd call an API endpoint to clear the session
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/admin" className="text-xl font-bold hover:text-slate-300 transition-colors">
          Admin Panel
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          href="/admin"
          isActive={isActive('/admin') && pathname === '/admin'}
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
        />

        <div className="pt-2 pb-2">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Products</p>
        </div>

        <NavLink
          href="/admin/products"
          isActive={isActive('/admin/products') && !pathname.includes('create')}
          icon={<Package size={20} />}
          label="All Products"
        />

        <NavLink
          href="/admin/products/create"
          isActive={pathname === '/admin/products/create'}
          icon={<Plus size={20} />}
          label="Add Product"
        />

        <div className="pt-4 border-t border-slate-700 mt-4">
          <NavLink
            href="/admin/settings"
            isActive={isActive('/admin/settings')}
            icon={<Settings size={20} />}
            label="Settings"
          />
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors disabled:opacity-50"
        >
          <LogOut size={20} />
          <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
        </button>
      </div>
    </aside>
  )
}

interface NavLinkProps {
  href: string
  isActive: boolean
  icon: React.ReactNode
  label: string
}

function NavLink({ href, isActive, icon, label }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-slate-700 text-white'
          : 'text-slate-400 hover:text-white hover:bg-slate-800'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  )
}
