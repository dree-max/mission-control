import { CheckSquare, Film, Calendar, Users, Activity, Clock, Zap, Rocket } from "lucide-react";
import Link from "next/link";
import { stats, tasks, contentItems, agents } from "../lib/data";

export default function Dashboard() {
  const dashboardStats = [
    { label: "Active Tasks", value: stats.tasksInProgress, icon: CheckSquare, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", href: "/tasks" },
    { label: "Content Items", value: stats.totalContent, icon: Film, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", href: "/pipeline" },
    { label: "Scheduled Tasks", value: stats.totalTasks, icon: Calendar, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", href: "/tasks" },
    { label: "Active Agents", value: stats.activeAgents, icon: Users, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", href: "/team" },
  ];

  const recentTasks = tasks.slice(0, 3);
  const recentContent = contentItems.slice(0, 3);

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

      {/* Stats Grid - All Clickable Links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={`cyber-card rounded-xl p-5 ${stat.border} hover:scale-[1.02] hover:border-cyan-500/40 transition-all cursor-pointer block`}
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
            </Link>
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
            <p className="font-medium text-white">Tasks</p>
            <p className="text-sm text-slate-500">{stats.totalTasks} total</p>
          </div>
        </Link>
        <Link href="/pipeline" className="flex items-center gap-3 p-4 rounded-xl cyber-card hover:border-purple-500/40 transition-all group">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 group-hover:border-purple-500/40 transition-colors">
            <Film className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="font-medium text-white">Pipeline</p>
            <p className="text-sm text-slate-500">{stats.totalContent} items</p>
          </div>
        </Link>
        <Link href="/team" className="flex items-center gap-3 p-4 rounded-xl cyber-card hover:border-green-500/40 transition-all group">
          <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 group-hover:border-green-500/40 transition-colors">
            <Users className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <p className="font-medium text-white">Team</p>
            <p className="text-sm text-slate-500">{agents.length} agents</p>
          </div>
        </Link>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="cyber-card rounded-xl p-5 border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              <CheckSquare className="h-5 w-5 text-cyan-400" />
              Recent Tasks
            </h2>
            <Link href="/tasks" className="text-sm text-cyan-400 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                <div>
                  <p className="font-medium text-white">{task.title}</p>
                  <p className="text-sm text-slate-500">{task.assignee}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  task.status === "Done" ? "bg-green-900/50 text-green-400" :
                  task.status === "In Progress" ? "bg-blue-900/50 text-blue-400" :
                  task.status === "Review" ? "bg-yellow-900/50 text-yellow-400" :
                  "bg-slate-700 text-slate-400"
                }`}>
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Content */}
        <div className="cyber-card rounded-xl p-5 border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              <Film className="h-5 w-5 text-purple-400" />
              Content Pipeline
            </h2>
            <Link href="/pipeline" className="text-sm text-purple-400 hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentContent.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="text-sm text-slate-500">{item.stage}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  item.status === "posted" ? "bg-green-900/50 text-green-400" :
                  item.status === "pending" ? "bg-yellow-900/50 text-yellow-400" :
                  "bg-slate-700 text-slate-400"
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
