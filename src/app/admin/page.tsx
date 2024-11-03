// app/admin/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { signOut } from 'next-auth/react'
import { 
  Search,
  LogOut,
  Calendar,
  Trash2,
  Download,
  MessageCircle,
  Users,
  BarChart2
} from 'lucide-react'

type Message = {
  id: string
  name: string
  email: string
  message: string
  createdAt: string
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'week' | 'month'>('all')
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    week: 0,
    month: 0
  })

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      const data = await response.json()
      setMessages(data)
      calculateStats(data)
    } catch (error) {
      console.error('Erreur:', error)
    }
    setLoading(false)
  }

  const calculateStats = (data: Message[]) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const week = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const month = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    setStats({
      total: data.length,
      today: data.filter(m => new Date(m.createdAt) >= today).length,
      week: data.filter(m => new Date(m.createdAt) >= week).length,
      month: data.filter(m => new Date(m.createdAt) >= month).length
    })
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) return

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMessages(messages.filter(m => m.id !== id))
        calculateStats(messages.filter(m => m.id !== id))
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  const exportToCsv = () => {
    const headers = ['Date', 'Nom', 'Email', 'Message']
    const csvContent = messages.map(m => [
      new Date(m.createdAt).toLocaleString(),
      m.name,
      m.email,
      `"${m.message.replace(/"/g, '""')}"`
    ].join(','))

    const csv = [headers.join(','), ...csvContent].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `messages-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const filteredMessages = messages
    .filter(message => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = 
        message.name.toLowerCase().includes(searchLower) ||
        message.email.toLowerCase().includes(searchLower) ||
        message.message.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false

      const date = new Date(message.createdAt)
      const now = new Date()
      switch (selectedFilter) {
        case 'today':
          return date >= new Date(now.setHours(0, 0, 0, 0))
        case 'week':
          return date >= new Date(now.setDate(now.getDate() - 7))
        case 'month':
          return date >= new Date(now.setMonth(now.getMonth() - 1))
        default:
          return true
      }
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Tableau de bord</h1>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/10">
                <MessageCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-white/60">Total Messages</p>
                <p className="text-2xl font-semibold text-white">{stats.total}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-green-500/10">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-white/60">Aujourd&apos;hui</p>
                <p className="text-2xl font-semibold text-white">{stats.today}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-purple-500/10">
                <BarChart2 className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-white/60">Cette semaine</p>
                <p className="text-2xl font-semibold text-white">{stats.week}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-orange-500/10">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-white/60">Ce mois</p>
                <p className="text-2xl font-semibold text-white">{stats.month}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              type="search"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 bg-white/5 border-white/10 text-white"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                setSelectedFilter(e.target.value as 'all' | 'today' | 'week' | 'month')}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
            >
              <option value="all">Tous</option>
              <option value="today">Aujourd&apos;hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
            </select>
            
            <button
              onClick={exportToCsv}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white"
            >
              <Download className="w-4 h-4" />
              Exporter
            </button>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-white/60">Chargement...</div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-white/60">Aucun message trouvé</div>
          ) : (
            filteredMessages.map((message) => (
              <Card 
                key={message.id} 
                className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-white/60 mb-1">Nom</div>
                        <div className="text-white font-medium">{message.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-white/60 mb-1">Email</div>
                        <div className="text-white font-medium break-all">{message.email}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Message</div>
                      <div className="text-white whitespace-pre-wrap">{message.message}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 self-end md:self-start">
                    <div className="text-sm text-white/40">
                      {new Date(message.createdAt).toLocaleString()}
                    </div>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  )
}