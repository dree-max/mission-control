'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  username: string
  display_name: string
  role: string
  workspace_id: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (!res.ok) {
          router.push('/login')
          return
        }
        const data = await res.json()
        setUser(data.user)
      } catch (err) {
        console.error('Failed to fetch user:', err)
        setError('Failed to load user data')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-secondary/50 backdrop-blur supports-[backdrop-filter]:bg-secondary/50">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">MC</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Mission Control</h1>
              <p className="text-xs text-muted-foreground">Agent Orchestration Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user?.display_name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {error && (
            <div role="alert" className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to Mission Control</h2>
            <p className="text-muted-foreground">Your OpenClaw Agent Orchestration Dashboard</p>
          </div>

          {/* Core Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Tasks Card */}
            <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Task Management</h3>
              <p className="text-sm text-muted-foreground mb-4">Create, assign, and track tasks across your agent network. Monitor progress with status updates from inbox to completion.</p>
              <button className="w-full px-4 py-2 rounded-lg bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 text-sm font-medium transition-colors">
                View Tasks
              </button>
            </div>

            {/* Agents Card */}
            <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Agent Management</h3>
              <p className="text-sm text-muted-foreground mb-4">Monitor agent status, activity, and configuration. View real-time updates on agent performance and availability.</p>
              <button className="w-full px-4 py-2 rounded-lg bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 text-sm font-medium transition-colors">
                View Agents
              </button>
            </div>

            {/* Messages Card */}
            <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Agent Communication</h3>
              <p className="text-sm text-muted-foreground mb-4">Enable agent-to-agent messaging and coordination. Track conversations and message history across your network.</p>
              <button className="w-full px-4 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 text-sm font-medium transition-colors">
                View Messages
              </button>
            </div>

            {/* Activity Feed Card */}
            <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Activity Monitoring</h3>
              <p className="text-sm text-muted-foreground mb-4">Track all activities and changes in your workspace. View audit logs and historical data for compliance.</p>
              <button className="w-full px-4 py-2 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 text-sm font-medium transition-colors">
                View Activity
              </button>
            </div>

            {/* Notifications Card */}
            <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Notifications</h3>
              <p className="text-sm text-muted-foreground mb-4">Get real-time notifications for important events. Receive alerts on task updates, mentions, and agent status changes.</p>
              <button className="w-full px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 text-sm font-medium transition-colors">
                View Notifications
              </button>
            </div>

            {/* Provisioning Card */}
            <div className="rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-pink-500/10">
                  <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Provisioning</h3>
              <p className="text-sm text-muted-foreground mb-4">Manage tenant provisioning and deployment. Track provision jobs and their execution history.</p>
              <button className="w-full px-4 py-2 rounded-lg bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 text-sm font-medium transition-colors">
                View Provisioning
              </button>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="rounded-lg border border-border bg-card p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">Platform Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="font-medium text-foreground mb-2">Backend</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Next.js API Routes</li>
                  <li>• Better SQLite3</li>
                  <li>• TypeScript</li>
                  <li>• Session Management</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Database</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• SQLite with WAL Mode</li>
                  <li>• Automated Migrations</li>
                  <li>• Audit Logging</li>
                  <li>• Workspace Isolation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Security</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Password Hashing (bcrypt)</li>
                  <li>• Secure Sessions</li>
                  <li>• Rate Limiting</li>
                  <li>• CSRF Protection</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Frontend</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• React 19</li>
                  <li>• Tailwind CSS</li>
                  <li>• Next.js App Router</li>
                  <li>• Dark Mode Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
