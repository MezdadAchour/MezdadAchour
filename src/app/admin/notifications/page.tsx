// app/admin/notifications/page.tsx
'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/card'

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    emailAddress: process.env.NEXT_PUBLIC_ADMIN_EMAIL || '',
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus('idle')

    try {
      const response = await fetch('/api/notifications/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        setSaveStatus('success')
      } else {
        setSaveStatus('error')
      }
    } catch (error) {
      setSaveStatus('error')
    }

    setIsSaving(false)
    setTimeout(() => setSaveStatus('idle'), 3000)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-white">Paramètres des notifications</h1>
      
      <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-white">Notifications par email</h3>
              <p className="text-sm text-white/60">
                Recevez un email pour chaque nouveau message
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) =>
                setSettings({ ...settings, emailNotifications: e.target.checked })
              }
              className="w-10 h-6 rounded-full bg-gray-300 appearance-none cursor-pointer relative transition duration-300
                         checked:bg-blue-500 checked:after:translate-x-4 after:content-[''] after:absolute after:left-1 after:top-1 
                         after:h-4 after:w-4 after:bg-white after:rounded-full"
            />
          </div>

          {settings.emailNotifications && (
            <div>
              <label className="block text-sm text-white/80 mb-2">
                Adresse email de notification
              </label>
              <input
                type="email"
                value={settings.emailAddress}
                onChange={(e) =>
                  setSettings({ ...settings, emailAddress: e.target.value })
                }
                className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
          >
            {isSaving ? 'Enregistrement...' : 'Enregistrer les paramètres'}
          </button>

          {saveStatus === 'success' && (
            <div className="text-green-400 text-sm">
              Paramètres enregistrés avec succès
            </div>
          )}
          
          {saveStatus === 'error' && (
            <div className="text-red-400 text-sm">
              Erreur lors de l&apos;enregistrement
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
