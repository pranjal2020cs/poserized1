'use client'

import { useState, useEffect } from 'react'
import { Play, Save } from 'lucide-react'

interface HeroSettings {
  videoUrl: string
  videoOpacity: number
}

export function HeroVideoSettings() {
  const [settings, setSettings] = useState<HeroSettings>({
    videoUrl: 'https://v0.blob.vercel-storage.com/rcarecords-hero-background-optimized.mp4',
    videoOpacity: 50,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [previewUrl, setPreviewUrl] = useState(settings.videoUrl)

  useEffect(() => {
    // Load from localStorage after client hydration
    if (typeof window !== 'undefined') {
      const savedUrl = localStorage.getItem('heroVideoUrl') || settings.videoUrl
      const savedOpacity = parseInt(localStorage.getItem('heroVideoOpacity') || '50', 10)
      
      setSettings({
        videoUrl: savedUrl,
        videoOpacity: savedOpacity,
      })
      setPreviewUrl(savedUrl)
    }
  }, [])

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      videoUrl: e.target.value,
    }))
    setPreviewUrl(e.target.value)
  }

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings((prev) => ({
      ...prev,
      videoOpacity: parseInt(e.target.value, 10),
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      // Save to localStorage for client-side persistence
      if (typeof window !== 'undefined') {
        localStorage.setItem('heroVideoUrl', settings.videoUrl)
        localStorage.setItem('heroVideoOpacity', String(settings.videoOpacity))
      }

      // Save to API for persistent storage
      const response = await fetch('/api/settings/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        setSaveMessage('Hero settings saved successfully!')
        setTimeout(() => setSaveMessage(''), 3000)
      } else {
        setSaveMessage('Failed to save settings. Changes saved locally.')
      }
    } catch (error) {
      setSaveMessage('Error saving settings. Local changes saved.')
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Save Message */}
      {saveMessage && (
        <div className={`p-4 rounded-lg ${
          saveMessage.includes('success')
            ? 'bg-green-50 border border-green-200'
            : 'bg-blue-50 border border-blue-200'
        }`}>
          <p className={`text-sm font-medium ${
            saveMessage.includes('success')
              ? 'text-green-800'
              : 'text-blue-800'
          }`}>
            {saveMessage}
          </p>
        </div>
      )}

      {/* Video URL */}
      <div>
        <label htmlFor="videoUrl" className="block text-sm font-semibold text-slate-900 mb-3">
          Video URL
        </label>
        <input
          type="url"
          id="videoUrl"
          value={settings.videoUrl}
          onChange={handleVideoUrlChange}
          placeholder="https://example.com/video.mp4"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <p className="text-xs text-slate-600 mt-2">
          Enter the full URL to your hero section background video. Supported formats: MP4, WebM
        </p>
      </div>

      {/* Video Preview */}
      {previewUrl && (
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">Video Preview</label>
          <div className="relative bg-black rounded-lg overflow-hidden border border-slate-300">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-64 object-cover"
              style={{ opacity: settings.videoOpacity / 100 }}
            >
              <source src={previewUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Play className="text-white" size={24} fill="white" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Opacity */}
      <div>
        <label htmlFor="opacity" className="block text-sm font-semibold text-slate-900 mb-3">
          Video Opacity: {settings.videoOpacity}%
        </label>
        <input
          type="range"
          id="opacity"
          min="0"
          max="100"
          step="5"
          value={settings.videoOpacity}
          onChange={handleOpacityChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <p className="text-xs text-slate-600 mt-2">
          Lower values make the video more transparent. Recommended: 40-60% for better text readability
        </p>
      </div>

      {/* Current Settings Info */}
      <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
        <h3 className="font-semibold text-slate-900 mb-3">Current Settings</h3>
        <div className="space-y-2 text-sm text-slate-600">
          <p><strong>Video URL:</strong> <code className="bg-white px-2 py-1 rounded text-xs break-all">{settings.videoUrl}</code></p>
          <p><strong>Opacity:</strong> {settings.videoOpacity}%</p>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-blue-500/50"
      >
        <Save size={20} />
        {isSaving ? 'Saving...' : 'Save Hero Settings'}
      </button>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Tips for Hero Video</h4>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Use MP4 format for best browser compatibility</li>
          <li>Keep video file size under 10MB for faster loading</li>
          <li>Use landscape orientation (16:9 aspect ratio)</li>
          <li>Test on mobile devices to ensure proper display</li>
          <li>Ensure video content doesn't conflict with text overlay</li>
        </ul>
      </div>
    </div>
  )
}
