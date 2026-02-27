"use client";

import { Bot, Code, PenTool, Search, Palette, Users } from "lucide-react";
import Link from "next/link";
import { agents as teamAgents, Agent, AgentCategory } from "@/lib/data";

const categoryIcons: Record<AgentCategory, React.ElementType> = { 
  lead: Users, content: PenTool, developer: Code, designer: Palette, researcher: Search 
};

const categoryColors: Record<AgentCategory, string> = {
  lead: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  content: "bg-purple-600/20 text-purple-400 border-purple-600/30",
  developer: "bg-green-600/20 text-green-400 border-green-600/30",
  designer: "bg-pink-600/20 text-pink-400 border-pink-600/30",
  researcher: "bg-orange-600/20 text-orange-400 border-orange-600/30",
};

const statusColors: Record<string, string> = { 
  active: "bg-green-500", idle: "bg-yellow-500", offline: "bg-zinc-500" 
};

export default function TeamPage() {
  const categories: AgentCategory[] = ["lead", "content", "developer", "designer", "researcher"];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Team</h1>
        <p className="text-zinc-400">Your digital organization</p>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4 mb-6">
        <Link href="/tasks" className="text-sm text-cyan-400 hover:underline">→ Tasks</Link>
        <Link href="/pipeline" className="text-sm text-purple-400 hover:underline">→ Pipeline</Link>
        <Link href="/content" className="text-sm text-blue-400 hover:underline">→ Content</Link>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-sm text-zinc-400">Total Agents</p>
          <p className="text-2xl font-bold">{teamAgents.length}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-sm text-zinc-400">Active</p>
          <p className="text-2xl font-bold text-green-400">{teamAgents.filter(a => a.status === "active").length}</p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
          <p className="text-sm text-zinc-400">Idle</p>
          <p className="text-2xl font-bold text-yellow-400">{teamAgents.filter(a => a.status === "idle").length}</p>
        </div>
      </div>

      {categories.map((category) => {
        const categoryAgents = teamAgents.filter(a => a.category === category);
        if (categoryAgents.length === 0) return null;
        const Icon = categoryIcons[category];
        return (
          <div key={category} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Icon className="h-5 w-5 text-zinc-400" />
              <h2 className="text-lg font-semibold capitalize">{category}s</h2>
              <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs">{categoryAgents.length}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {categoryAgents.map((agent: Agent) => (
                <div key={agent.id} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 hover:border-zinc-700">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold border ${categoryColors[agent.category]}`}>
                        {agent.name[0]}
                      </div>
                      <div>
                        <h3 className="font-medium">{agent.name}</h3>
                        <p className="text-xs text-zinc-500">{agent.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className={`h-2 w-2 rounded-full ${statusColors[agent.status]}`} />
                      <span className="text-xs capitalize text-zinc-500">{agent.status}</span>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-zinc-400">{agent.description}</p>
                  {agent.bot && (
                    <div className="flex items-center gap-2">
                      <Bot className="h-3 w-3 text-zinc-500" />
                      <span className="text-xs text-zinc-500">{agent.bot}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
