'use client'

import { useState, useEffect } from 'react'
import { Users, User, CheckCircle, XCircle, Clock, Zap, Brain, PenTool, Search, Share2, RefreshCw } from 'lucide-react'

type Agent = {
  id: string
  name: string
  role: string
  emoji: string
  status: 'working' | 'idle' | 'error'
  description?: string
  skills?: string[]
  currentTask?: string
}

const roleIcons: Record<string, React.ElementType> = {
  'Coordination': Zap,
  'Research': Search,
  'Content': PenTool,
  'SEO': Brain,
  'Social': Share2,
  'Squad Lead': Users,
}

export default function TeamPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/openclaw')
      const data = await res.json()
      
      if (data.agents) {
        setAgents(data.agents)
      }
      setLastUpdated(new Date().toLocaleTimeString())
    } catch (error) {
      console.error('Failed to fetch:', error)
    } finally {
      setLoading(false)
    }
  }

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'working': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'idle': return <Clock className="w-4 h-4 text-yellow-400" />
      case 'error': return <XCircle className="w-4 h-4 text-red-400" />
    }
  }

  const workingCount = agents.filter(a => a.status === 'working').length
  const idleCount = agents.filter(a => a.status === 'idle').length

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-gray-400">Agent roster and status (auto-refreshes every 30s)</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-500">Last updated: {lastUpdated}</span>
          <button 
            onClick={fetchData}
            className="flex items-center px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-gray-600"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        <div className="flex items-center text-sm">
          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
          <span>{workingCount} working</span>
        </div>
        <div className="flex items-center text-sm">
          <Clock className="w-4 h-4 text-yellow-400 mr-2" />
          <span>{idleCount} idle</span>
        </div>
      </div>

      {loading && agents.length === 0 ? (
        <p className="text-gray-500">Loading agent data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(agent => {
            const RoleIcon = roleIcons[agent.role] || User
            
            return (
              <div
                key={agent.id}
                className={`bg-[#1a1a1a] border rounded-lg p-5 transition-colors ${
                  agent.status === 'working' 
                    ? 'border-green-500/50' 
                    : agent.status === 'error'
                    ? 'border-red-500/50'
                    : 'border-[#2a2a2a] hover:border-gray-600'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">{agent.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{agent.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded inline-flex items-center ${
                        agent.role === 'Squad Lead' ? 'bg-yellow-900 text-yellow-200' :
                        agent.role === 'Research' ? 'bg-red-900 text-red-200' :
                        agent.role === 'Content' ? 'bg-green-900 text-green-200' :
                        agent.role === 'SEO' ? 'bg-purple-900 text-purple-200' :
                        agent.role === 'Social' ? 'bg-orange-900 text-orange-200' :
                        'bg-blue-900 text-blue-200'
                      }`}>
                        <RoleIcon className="w-3 h-3 mr-1" />
                        {agent.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(agent.status)}
                  </div>
                </div>

                {agent.currentTask && (
                  <div className="mb-3 p-2 bg-[#0a0a0a] rounded border border-[#2a2a2a]">
                    <span className="text-xs text-gray-500">Current task:</span>
                    <p className="text-sm text-green-400">{agent.currentTask}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
