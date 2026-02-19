'use client'

import { useState, useEffect } from 'react'
import { Plus, GripVertical, User, RefreshCw } from 'lucide-react'

type Task = {
  id: string
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'done'
  assignee: 'ivan' | 'kagu'
  priority: 'low' | 'medium' | 'high'
  createdAt: string
}

const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Setup Mission Control',
    description: 'Build the dashboard with all 5 components',
    status: 'in_progress',
    assignee: 'kagu',
    priority: 'high',
    createdAt: '2026-02-19',
  },
  {
    id: '2',
    title: 'Connect LinkedIn API',
    description: 'Setup posting to company page',
    status: 'todo',
    assignee: 'ivan',
    priority: 'medium',
    createdAt: '2026-02-19',
  },
  {
    id: '3',
    title: 'Fix API rate limits',
    description: 'MiniMax auth issue needs resolution',
    status: 'todo',
    assignee: 'ivan',
    priority: 'high',
    createdAt: '2026-02-19',
  },
]

const columns = [
  { id: 'todo', title: 'To Do', color: 'border-gray-500' },
  { id: 'in_progress', title: 'In Progress', color: 'border-blue-500' },
  { id: 'done', title: 'Done', color: 'border-green-500' },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDesc, setNewTaskDesc] = useState('')
  const [newTaskAssignee, setNewTaskAssignee] = useState<'ivan' | 'kagu'>('kagu')
  const [showForm, setShowForm] = useState(false)

  const addTask = () => {
    if (!newTaskTitle.trim()) return
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDesc,
      status: 'todo',
      assignee: newTaskAssignee,
      priority: 'medium',
      createdAt: new Date().toISOString().split('T')[0],
    }
    
    setTasks([...tasks, newTask])
    setNewTaskTitle('')
    setNewTaskDesc('')
    setShowForm(false)
  }

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, status: newStatus } : t
    ))
  }

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(t => t.status === status)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Tasks Board</h1>
          <p className="text-gray-400">Track everything the squad is working on</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg">
          <input
            type="text"
            placeholder="Task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded mb-3 text-white focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Description (optional)"
            value={newTaskDesc}
            onChange={(e) => setNewTaskDesc(e.target.value)}
            className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded mb-3 text-white focus:outline-none focus:border-blue-500"
            rows={2}
          />
          <div className="flex justify-between items-center">
            <select
              value={newTaskAssignee}
              onChange={(e) => setNewTaskAssignee(e.target.value as 'ivan' | 'kagu')}
              className="px-3 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded text-white focus:outline-none"
            >
              <option value="kagu">Kagu (Squad)</option>
              <option value="ivan">Ivan (You)</option>
            </select>
            <div className="space-x-2">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div key={column.id} className={`border-t-2 ${column.color} pt-4`}>
            <h2 className="font-semibold mb-4 flex items-center justify-between">
              {column.title}
              <span className="text-sm text-gray-500 bg-[#1a1a1a] px-2 py-1 rounded">
                {getTasksByStatus(column.id as Task['status']).length}
              </span>
            </h2>
            <div className="space-y-3">
              {getTasksByStatus(column.id as Task['status']).map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-gray-600 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium">{task.title}</h3>
                    <GripVertical className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100" />
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-400 mb-3">{task.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center text-xs px-2 py-1 rounded ${
                      task.assignee === 'kagu' 
                        ? 'bg-purple-900 text-purple-200' 
                        : 'bg-blue-900 text-blue-200'
                    }`}>
                      <User className="w-3 h-3 mr-1" />
                      {task.assignee === 'kagu' ? 'Kagu' : 'Ivan'}
                    </div>
                    <select
                      value={task.status}
                      onChange={(e) => moveTask(task.id, e.target.value as Task['status'])}
                      className="text-xs bg-[#0a0a0a] border border-[#2a2a2a] rounded px-2 py-1 text-gray-400"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
