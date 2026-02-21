"use client";

import { useState, useEffect } from "react";
import { Coffee, Keyboard, Coffee as Cup, MessageSquare, Code, FileText, Zap, Play } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  role: string;
  status: "working" | "idle" | "break";
  activity: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  emoji: string;
}

const initialAgents: Agent[] = [
  { id: "kagu", name: "Kagu", role: "Squad Lead", status: "working", activity: "Coordinating team", x: 80, y: 120, targetX: 80, targetY: 120, color: "bg-blue-500", emoji: "🦉" },
  { id: "jarvis", name: "Jarvis", role: "Content", status: "working", activity: "Writing content", x: 220, y: 180, targetX: 220, targetY: 180, color: "bg-purple-500", emoji: "🤵" },
  { id: "fury", name: "Fury", role: "Strategy", status: "idle", activity: "Thinking", x: 360, y: 100, targetX: 360, targetY: 100, color: "bg-red-500", emoji: "🧑‍💼" },
  { id: "loki", name: "Loki", role: "Writer", status: "working", activity: "Writing scripts", x: 500, y: 150, targetX: 500, targetY: 150, color: "bg-green-500", emoji: "🧑‍🎨" },
  { id: "vision", name: "Vision", role: "Research", status: "working", activity: "Analyzing data", x: 640, y: 120, targetX: 640, targetY: 120, color: "bg-yellow-500", emoji: "👁️" },
];

const workstations = [
  { id: "ws1", name: "Kagu's Desk", x: 80, y: 120, icon: MessageSquare },
  { id: "ws2", name: "Content Lab", x: 220, y: 180, icon: FileText },
  { id: "ws3", name: "War Room", x: 360, y: 100, icon: MessageSquare },
  { id: "ws4", name: "Writer's Corner", x: 500, y: 150, icon: Keyboard },
  { id: "ws5", name: "Data Center", x: 640, y: 120, icon: Code },
];

export default function OfficePage() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        let newActivity = agent.activity;
        let newStatus = agent.status;
        
        if (Math.random() < 0.03) {
          const activities = agent.status === "break" 
            ? ["Getting coffee", "Taking a break", "Resting"]
            : agent.role === "Content" || agent.role === "Writer"
              ? ["Writing content", "Researching", "Editing", "Brainstorming", "Creating"]
              : agent.role === "Strategy"
                ? ["Planning", "Reviewing", "Thinking", "Analyzing"]
                : agent.role === "Research"
                  ? ["Processing data", "Searching", "Analyzing", "Computing"]
                  : ["Coding", "Debugging", "Reviewing", "Building"];
          newActivity = activities[Math.floor(Math.random() * activities.length)];
        }
        
        if (Math.random() < 0.02) {
          const statuses: Agent["status"][] = ["working", "idle", "break"];
          newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        }
        
        let { x, y, targetX, targetY } = agent;
        
        if (Math.random() < 0.05) {
          targetX = 60 + Math.random() * 650;
          targetY = 60 + Math.random() * 200;
        }
        
        const dx = targetX - x;
        const dy = targetY - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 5) {
          x += (dx / dist) * 1.5;
          y += (dy / dist) * 1.5;
        }
        
        return { ...agent, x, y, targetX, targetY, activity: newActivity, status: newStatus };
      }));
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: Agent["status"]) => {
    switch (status) {
      case "working": return <Keyboard className="h-3 w-3" />;
      case "idle": return <Cup className="h-3 w-3" />;
      case "break": return <Coffee className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: Agent["status"]) => {
    switch (status) {
      case "working": return "bg-green-500";
      case "idle": return "bg-yellow-500";
      case "break": return "bg-blue-500";
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Office</h1>
        <p className="text-zinc-400">Digital workspace - watch your agents work</p>
      </div>

      <div className="relative h-[320px] rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden mb-6">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle, #3f3f46 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
        
        {workstations.map(ws => {
          const Icon = ws.icon;
          return (
            <div key={ws.id} className="absolute" style={{ left: ws.x - 40, top: ws.y - 40 }}>
              <div className="flex flex-col items-center">
                <div className="w-20 h-14 rounded-lg border border-zinc-700 bg-zinc-800 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-zinc-500" />
                </div>
                <span className="mt-1 text-xs text-zinc-500">{ws.name}</span>
              </div>
            </div>
          );
        })}

        {agents.map(agent => (
          <div key={agent.id} className="absolute transition-all duration-1000" style={{ left: agent.x - 16, top: agent.y - 16 }}>
            <div className="relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-lg ${agent.color}`}>
                {agent.emoji}
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-zinc-900 flex items-center justify-center ${getStatusColor(agent.status)}`}>
                {getStatusIcon(agent.status)}
              </div>
            </div>
            <div className="absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap">
              <p className="text-xs font-medium text-white bg-zinc-800 px-2 py-0.5 rounded">{agent.name}</p>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-zinc-950/90 p-3 border border-zinc-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400">Office Status</span>
            <span className="text-green-400">● Online</span>
          </div>
          <div className="mt-2 flex gap-4">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-xs text-zinc-500">Working: {agents.filter(a => a.status === "working").length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span className="text-xs text-zinc-500">Idle: {agents.filter(a => a.status === "idle").length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-xs text-zinc-500">Break: {agents.filter(a => a.status === "break").length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {agents.map(agent => (
          <div key={agent.id} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{agent.emoji}</span>
              <div>
                <p className="text-sm font-medium text-white">{agent.name}</p>
                <p className="text-xs text-zinc-500">{agent.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-1">
              <div className={`h-2 w-2 rounded-full ${getStatusColor(agent.status)}`} />
              <span className="text-xs capitalize text-zinc-400">{agent.status}</span>
            </div>
            <p className="text-xs text-zinc-500">{agent.activity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
