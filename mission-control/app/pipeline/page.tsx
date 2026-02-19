'use client'

import { useState } from 'react'
import { Plus, ArrowRight, Play, CheckCircle, Clock } from 'lucide-react'

// Pipeline types
type PipelineItem = {
  id: string
  title: string
  platform: 'youtube' | 'blog'
  stage: 'idea' | 'script' | 'thumbnail' | 'filming' | 'scheduled' | 'draft' | 'edit' | 'publish' | 'reddit'
  notes: string
  createdAt: string
}

const youtubeStages = [
  { id: 'idea', title: 'Idea', color: 'bg-yellow-500' },
  { id: 'script', title: 'Script', color: 'bg-blue-500' },
  { id: 'thumbnail', title: 'Thumbnail', color: 'bg-purple-500' },
  { id: 'filming', title: 'Filming', color: 'bg-red-500' },
  { id: 'scheduled', title: 'Scheduled', color: 'bg-green-500' },
]

const blogStages = [
  { id: 'idea', title: 'Idea', color: 'bg-yellow-500' },
  { id: 'draft', title: 'Draft', color: 'bg-blue-500' },
  { id: 'edit', title: 'Edit', color: 'bg-purple-500' },
  { id: 'publish', title: 'Publish', color: 'bg-green-500' },
  { id: 'reddit', title: 'Reddit', color: 'bg-orange-500' },
]

const defaultItems: PipelineItem[] = [
  {
    id: '1',
    title: 'AI Agents Tutorial',
    platform: 'youtube',
    stage: 'script',
    notes: 'Tutorial on building AI agents with OpenClaw',
    createdAt: '2026-02-18',
  },
  {
    id: '2',
    title: 'Mission Control Guide',
    platform: 'youtube',
    stage: 'idea',
    notes: 'How to build your own mission control',
    createdAt: '2026-02-19',
  },
  {
    id: '3',
    title: 'Getting Started with AI',
    platform: 'blog',
    stage: 'edit',
    notes: 'Beginner guide to AI tools',
    createdAt: '2026-02-17',
  },
]

export default function PipelinePage() {
  const [items, setItems] = useState<PipelineItem[]>(defaultItems)
  const [activeTab, setActiveTab] = useState<'youtube' | 'blog'>('youtube')
  const [showForm, setShowForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newNotes, setNewNotes] = useState('')

  const stages = activeTab === 'youtube' ? youtubeStages : blogStages

  const getItemsByStage = (stage: string) => {
    return items.filter(i => i.platform === activeTab && i.stage === stage)
  }

  const moveItem = (itemId: string, newStage: string) => {
    setItems(items.map(i => 
      i.id === itemId ? { ...i, stage: newStage as PipelineItem['stage'] } : i
    ))
  }

  const addItem = () => {
    if (!newTitle.trim()) return
    
    const newItem: PipelineItem = {
      id: Date.now().toString(),
      title: newTitle,
      platform: activeTab,
      stage: 'idea',
      notes: newNotes,
      createdAt: new Date().toISOString().split('T')[0],
    }
    
    setItems([...items, newItem])
    setNewTitle('')
    setNewNotes('')
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Content Pipeline</h1>
          <p className="text-gray-400">YouTube & Blog content workflows</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Content
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('youtube')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'youtube' 
              ? 'bg-red-600 text-white' 
              : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
          }`}
        >
          YouTube
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'blog' 
              ? 'bg-orange-600 text-white' 
              : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
          }`}
        >
          Blog → Reddit
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
          <input
            type="text"
            placeholder="Content title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded mb-3 text-white focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Notes / description"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded mb-3 text-white focus:outline-none focus:border-blue-500"
            rows={2}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={addItem}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Pipeline */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex-shrink-0 w-64">
            <div className={`flex items-center justify-between mb-3 pb-2 border-b-2 ${stage.color.replace('bg-', 'border-')}`}>
              <h3 className="font-semibold">{stage.title}</h3>
              <span className="text-xs text-gray-500 bg-[#1a1a1a] px-2 py-1 rounded">
                {getItemsByStage(stage.id).length}
              </span>
            </div>
            <div className="space-y-3 min-h-[200px]">
              {getItemsByStage(stage.id).map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-gray-600 cursor-pointer"
                >
                  <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                  {item.notes && (
                    <p className="text-xs text-gray-400 mb-2 line-clamp-2">{item.notes}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.createdAt}</span>
                    <select
                      value={item.stage}
                      onChange={(e) => moveItem(item.id, e.target.value)}
                      className="text-xs bg-[#0a0a0a] border border-[#2a2a2a] rounded px-1 py-0.5 text-gray-400"
                    >
                      {stages.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
            {index < stages.length - 1 && (
              <div className="flex justify-center my-2">
                <ArrowRight className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
