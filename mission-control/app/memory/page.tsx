'use client'

import { useState, useEffect } from 'react'
import { Search, FileText, Clock, Tag, RefreshCw } from 'lucide-react'

type Memory = {
  id: string
  title: string
  content: string
  type: 'conversation' | 'decision' | 'task' | 'preference'
  tags: string[]
  createdAt: string
}

export default function MemoryPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  useEffect(() => {
    fetch('/data/memory.json')
      .then(res => res.json())
      .then(data => {
        setMemories(data.memories)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filteredMemories = memories.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const refreshData = () => {
    window.location.reload()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Memory</h1>
          <p className="text-gray-400">Searchable log of all memories (live data)</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-green-400">● Live</span>
          <button 
            onClick={refreshData}
            className="flex items-center px-3 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-gray-600"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search memories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-gray-500">Loading memories...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Memory List */}
          <div className="lg:col-span-1 space-y-3">
            {filteredMemories.map(memory => (
              <div
                key={memory.id}
                onClick={() => setSelectedMemory(memory)}
                className={`p-4 bg-[#1a1a1a] border rounded-lg cursor-pointer transition-colors ${
                  selectedMemory?.id === memory.id 
                    ? 'border-blue-500' 
                    : 'border-[#2a2a2a] hover:border-gray-600'
                }`}
              >
                <h3 className="font-medium mb-2">{memory.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-2">{memory.content}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    memory.type === 'preference' ? 'bg-purple-900 text-purple-200' :
                    memory.type === 'decision' ? 'bg-green-900 text-green-200' :
                    memory.type === 'conversation' ? 'bg-blue-900 text-blue-200' :
                    'bg-yellow-900 text-yellow-200'
                  }`}>
                    {memory.type}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {memory.createdAt}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Memory Detail */}
          <div className="lg:col-span-2">
            {selectedMemory ? (
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-semibold">{selectedMemory.title}</h2>
                  <span className={`text-xs px-2 py-1 rounded ${
                    selectedMemory.type === 'preference' ? 'bg-purple-900 text-purple-200' :
                    selectedMemory.type === 'decision' ? 'bg-green-900 text-green-200' :
                    'bg-blue-900 text-blue-200'
                  }`}>
                    {selectedMemory.type}
                  </span>
                </div>
                <p className="text-gray-300 mb-4 whitespace-pre-wrap">{selectedMemory.content}</p>
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  {selectedMemory.tags.map(tag => (
                    <span key={tag} className="text-xs bg-[#0a0a0a] text-gray-400 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-[#2a2a2a] text-sm text-gray-500">
                  Created: {selectedMemory.createdAt}
                </div>
              </div>
            ) : (
              <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Select a memory to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
