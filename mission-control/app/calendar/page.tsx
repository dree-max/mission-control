'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Clock, RefreshCw } from 'lucide-react'

type CronJob = {
  id: string
  agent: string
  time: string
  status: string
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [cronJobs, setCronJobs] = useState<CronJob[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/openclaw')
      const data = await res.json()
      
      if (data.cronJobs) {
        setCronJobs(data.cronJobs)
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

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getJobsForDay = (day: number) => {
    const date = new Date(year, month, day)
    const dayOfWeek = date.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) return []
    return cronJobs
  }

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-gray-400">Scheduled tasks and cron jobs (auto-refreshes every 30s)</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-2 hover:bg-[#2a2a2a] rounded">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold">
                {months[month]} {year}
              </h2>
              <button onClick={nextMonth} className="p-2 hover:bg-[#2a2a2a] rounded">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-sm text-gray-500 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const dayJobs = day ? getJobsForDay(day) : []
                const isToday = day === new Date().getDate() && 
                  month === new Date().getMonth() && 
                  year === new Date().getFullYear()
                
                return (
                  <div
                    key={index}
                    className={`min-h-[80px] p-2 border border-[#2a2a2a] rounded ${
                      isToday ? 'bg-blue-900/30 border-blue-500' : ''
                    } ${!day ? 'bg-transparent' : 'bg-[#0a0a0a]'}`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-400' : ''}`}>
                          {day}
                        </div>
                        {dayJobs.slice(0, 2).map(job => (
                          <div key={job.id} className={`text-xs truncate ${
                            job.status === 'error' ? 'text-red-400' : 'text-gray-400'
                          }`}>
                            {job.time} {job.agent}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Schedule List - LIVE DATA */}
        <div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <Clock className="w-4 h2" />
             -4 mr- Today's Schedule
              <span className="ml-auto text-xs text-green-400">● Live</span>
            </h3>
            {loading && cronJobs.length === 0 ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-3">
                {cronJobs.map(job => (
                  <div key={job.id} className={`p-3 bg-[#0a0a0a] border rounded-lg ${
                    job.status === 'error' ? 'border-red-900' : 'border-[#2a2a2a]'
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{job.agent}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        job.status === 'error' ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'
                      }`}>
                        {job.status === 'error' ? 'Error' : 'Scheduled'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">Daily at {job.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
