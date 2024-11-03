'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result?.error) {
        setError('Email ou mot de passe incorrect')
      } else {
        router.push('/admin')
        router.refresh()
      }
    } catch (error) {
      setError('Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-white/5 backdrop-blur-sm border border-white/10">
        <h1 className="text-2xl font-bold mb-6 text-white">Connexion Admin</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/80 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-lg text-white"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm text-white/80 mb-2">Mot de passe</label>
            <input
              type="password"
              name="password"
              className="w-full h-12 px-4 bg-white/5 border border-white/10 rounded-lg text-white"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </Card>
    </div>
  )
}