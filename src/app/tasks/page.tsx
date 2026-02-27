"use client";

import { useState } from "react";
import { Plus, GripVertical, X } from "lucide-react";
import Link from "next/link";
import { tasks as initialTasks, Task, TaskStatus, Assignee } from "@/lib/data";

const columns: TaskStatus[] = ["Inbox", "Assigned", "In Progress", "Review", "Done"];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "", assignee: "Ivan" as Assignee });

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const addTask = () => {
    if (!newTask.title) return;
    const task: Task = { 
      id: Date.now().toString(), 
      ...newTask, 
      status: "Inbox",
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks([...tasks, task]);
    setShowAddModal(false);
    setNewTask({ title: "", description: "", assignee: "Ivan" });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks Board</h1>
          <p className="text-zinc-400">Track all tasks and assignments</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Add Task
        </button>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4 mb-6">
        <Link href="/pipeline" className="text-sm text-purple-400 hover:underline">→ Content Pipeline</Link>
        <Link href="/team" className="text-sm text-green-400 hover:underline">→ Team</Link>
        <Link href="/content" className="text-sm text-blue-400 hover:underline">→ Content</Link>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {columns.map((column) => {
          const columnTasks = tasks.filter(t => t.status === column);
          return (
            <div key={column} className="rounded-xl bg-zinc-900/50 p-4 min-h-[400px]">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-medium text-zinc-300">{column}</h3>
                <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs">{columnTasks.length}</span>
              </div>
              <div className="space-y-2">
                {columnTasks.map((task) => (
                  <div key={task.id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 hover:border-zinc-700 cursor-pointer"
                    draggable onDragStart={(e) => e.dataTransfer.setData("taskId", task.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData("taskId"); moveTask(id, column); }}
                  >
                    <p className="font-medium text-sm">{task.title}</p>
                    {task.description && <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{task.description}</p>}
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`rounded px-2 py-0.5 text-xs ${task.assignee === "Ivan" ? "bg-orange-600/20 text-orange-400" : "bg-purple-600/20 text-purple-400"}`}>
                        {task.assignee}
                      </span>
                      <span className="text-xs text-zinc-600">{task.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add New Task</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Title</label>
                <input type="text" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm" placeholder="Task title" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Description</label>
                <textarea value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm" rows={3} placeholder="Task description" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Assignee</label>
                <select value={newTask.assignee} onChange={(e) => setNewTask({...newTask, assignee: e.target.value as Assignee})}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm">
                  <option value="Ivan">Ivan</option>
                  <option value="MarvelSquad">MarvelSquad</option>
                </select>
              </div>
              <button onClick={addTask} className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium hover:bg-blue-700">Add Task</button>
            </div>
          </div>
        </div>
      )}
  );
}
    </div>
