"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [agents, setAgents] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.details || data.error);
        } else {
          setAgents(data.agents || []);
          setTasks(data.tasks || []);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-600';
      case 'Idle': return 'bg-gray-600';
      case 'Blocked': return 'bg-red-600';
      case 'In Progress': return 'bg-blue-600';
      case 'Review': return 'bg-yellow-600';
      case 'Done': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mission Control</h1>
      
      {/* Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Activity Feed</h2>
          <p className="text-gray-400">View all agent activities</p>
          <Link href="/activity" className="text-blue-400 hover:underline mt-2 block">
            Open Activity Feed →
          </Link>
        </div>
        
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Calendar</h2>
          <p className="text-gray-400">Weekly task schedule</p>
          <Link href="/calendar" className="text-blue-400 hover:underline mt-2 block">
            View Calendar →
          </Link>
        </div>
        
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Search</h2>
          <p className="text-gray-400">Search memories, tasks & more</p>
          <Link href="/search" className="text-blue-400 hover:underline mt-2 block">
            Search Everything →
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : error ? (
        <div className="text-red-400">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Agents Panel */}
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Agents</h2>
            {agents.length > 0 ? (
              <ul className="space-y-3">
                {agents.map((agent: any) => (
                  <li key={agent.id} className="border-b border-gray-700 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{agent.name}</span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(agent.status)}`}>
                        {agent.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">{agent.role}</p>
                    <p className="text-xs text-gray-500">{agent.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No agents yet</p>
            )}
          </div>

          {/* Tasks Panel */}
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>
            {tasks.length > 0 ? (
              <ul className="space-y-3">
                {tasks.map((task: any) => (
                  <li key={task.id} className="border-b border-gray-700 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{task.name}</span>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{task.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No tasks yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
