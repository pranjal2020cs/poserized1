'use client'

import { AdminHeader } from '@/components/admin/AdminHeader'
import { HeroVideoSettings } from '@/components/admin/HeroVideoSettings'

export default function SettingsPage() {
  return (
    <div>
      <AdminHeader title="Settings" description="Manage site configuration and hero section" />

      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        {/* Hero Section Video Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Hero Section</h2>
            <p className="text-slate-600">Manage the background video displayed on your homepage hero section</p>
          </div>

          <HeroVideoSettings />
        </div>
      </div>
    </div>
  )
}
