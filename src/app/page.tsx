import { CheckSquare, Film, Calendar, Users, Activity, Clock, Zap, Rocket } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Active Tasks", value: "12", icon: CheckSquare, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { label: "Content Items", value: "8", icon: Film, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { label: "Scheduled Events", value: "24", icon: Calendar, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  { label: "Active Agents", value: "5", icon: Users, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
];

const recentActivity = [
  { agent: "Kagu", action: "Updated task status", time: "2 min ago", avatar: "K", color: "bg-cyan-500/20 text-cyan-400" },
  { agent: "MarvelSquad", action: "Completed content script", time: "15 min ago", avatar: "M", color: "bg-purple-500/20 text-purple-400" },
  { agent: "Jarvis", action: "Posted to LinkedIn", time: "1 hour ago", avatar: "J", color: "bg-blue-500/20 text-blue-400" },
  { agent: "Fury", action: "Generated SEO report", time: "2 hours ago", avatar: "F", color: "bg-green-500/20 text-green-400" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Rocket className="h-6 w-6 text-cyan-400" />
          Dashboard
        </h1>
        <p className="text-slate-400">Welcome to Mission Control</p>
      </div>

      {/* Stats Grid - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`cyber-card rounded-xl p-5 ${stat.border}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg} border ${stat.border}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/tasks" className="flex items-center gap-3 p-4 rounded-xl cyber-card hover:border-cyan-500/40 transition-all group">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors">
            <Zap className="h-5 w-5 text-cyan-400" />
          </div>
          <div>
            <p className="font-medium text-white">Quick Task</p>
            <p className="text-sm text-slate-500">Add a new task</p>
          </div>
        </Link>
        <Link href="/content" className="flex items-center gap-3 p-4 rounded-xl cyber-card hover:border-purple-500/40 transition-all group">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
            <Film className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="font-medium text-white">New Content</p>
            <p className="text-sm text-slate-500">Add content idea</p>
          </div>
        </Link>
        <Link href="/calendar" className="flex items-center gap-3 p-4 rounded-xl cyber-card hover:border-green-500/40 transition-all group">
          <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 group-hover:border-green-500/40 transition-colors">
            <Clock className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <p className="font-medium text-white">Schedule</p>
            <p className="text-sm text-slate-500">Plan an event</p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="cyber-card rounded-xl p-5 border-cyan-500/20">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
          <Activity className="h-5 w-5 text-cyan-400" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-slate-800 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold ${item.color}`}>
                  {item.avatar}
                </div>
                <div>
                  <p className="font-medium text-white">{item.agent}</p>
                  <p className="text-sm text-slate-500">{item.action}</p>
                </div>
              </div>
              <span className="text-sm text-slate-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
