'use client'

import { User, Menu } from 'lucide-react'
import { useState } from 'react'

interface AdminHeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-slate-200 ml-64">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {description && <p className="text-slate-600 mt-1">{description}</p>}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors hidden md:block">
            <User size={20} className="text-slate-600" />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
          >
            <Menu size={20} className="text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  )
}
