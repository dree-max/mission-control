import { CheckSquare, Film, Calendar, Users, Activity, Clock, Zap } from "lucide-react";

const stats = [
  { label: "Active Tasks", value: "12", icon: CheckSquare, color: "text-blue-400", bg: "bg-blue-400/10" },
  { label: "Content Items", value: "8", icon: Film, color: "text-purple-400", bg: "bg-purple-400/10" },
  { label: "Scheduled Events", value: "24", icon: Calendar, color: "text-green-400", bg: "bg-green-400/10" },
  { label: "Active Agents", value: "5", icon: Users, color: "text-orange-400", bg: "bg-orange-400/10" },
];

const recentActivity = [
  { agent: "Kagu", action: "Updated task status", time: "2 min ago", avatar: "K" },
  { agent: "MarvelSquad", action: "Completed content script", time: "15 min ago", avatar: "M" },
  { agent: "Jarvis", action: "Posted to LinkedIn", time: "1 hour ago", avatar: "J" },
  { agent: "Fury", action: "Generated SEO report", time: "2 hours ago", avatar: "F" },
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-400">Welcome to your Mission Control</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-left">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Zap className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="font-medium text-white">Quick Task</p>
            <p className="text-sm text-zinc-500">Add a new task</p>
          </div>
        </button>
        <button className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-left">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <Film className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="font-medium text-white">New Content</p>
            <p className="text-sm text-zinc-500">Add content idea</p>
          </div>
        </button>
        <button className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 transition-colors text-left">
          <div className="p-2 rounded-lg bg-green-500/10">
            <Clock className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <p className="font-medium text-white">Schedule</p>
            <p className="text-sm text-zinc-500">Plan an event</p>
          </div>
        </button>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
          <Activity className="h-5 w-5 text-zinc-400" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-600/20 flex items-center justify-center text-sm font-bold text-blue-400">
                  {item.avatar}
                </div>
                <div>
                  <p className="font-medium text-white">{item.agent}</p>
                  <p className="text-sm text-zinc-500">{item.action}</p>
                </div>
              </div>
              <span className="text-sm text-zinc-500">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
