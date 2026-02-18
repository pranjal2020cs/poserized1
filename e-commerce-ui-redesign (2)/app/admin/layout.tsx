import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Admin Panel',
  description: 'Product management admin panel',
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 bg-slate-50 min-h-screen">{children}</main>
    </div>
  )
}
