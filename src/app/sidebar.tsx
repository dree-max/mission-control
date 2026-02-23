"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Film,
  Calendar,
  MemoryStick,
  Users,
  Building2,
  Linkedin,
  FileText,
} from "lucide-react";

const basePath = "/mission-control";

const navItems = [
  { href: basePath + "/", label: "Dashboard", icon: LayoutDashboard },
  { href: basePath + "/tasks", label: "Tasks", icon: CheckSquare },
  { href: basePath + "/pipeline", label: "Pipeline", icon: Film },
  { href: basePath + "/content", label: "Content", icon: FileText },
  { href: basePath + "/calendar", label: "Calendar", icon: Calendar },
  { href: basePath + "/linkedin", label: "LinkedIn", icon: Linkedin },
  { href: basePath + "/memory", label: "Memory", icon: MemoryStick },
  { href: basePath + "/team", label: "Team", icon: Users },
  { href: basePath + "/office", label: "Office", icon: Building2 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r border-zinc-800 bg-zinc-950">
      <div className="p-4">
        <h1 className="text-lg font-bold text-blue-400">Mission Control</h1>
        <p className="text-xs text-zinc-500">MoonlightAI</p>
      </div>

      <nav className="px-2 py-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 w-48 rounded-lg bg-zinc-900 p-3">
        <p className="text-xs text-zinc-500">Powered by</p>
        <p className="text-sm font-medium text-zinc-300">Next.js + Convex</p>
      </div>
    </aside>
  );
}
