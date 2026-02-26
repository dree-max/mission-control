"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  Menu,
  X,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/pipeline", label: "Pipeline", icon: Film },
  { href: "/content", label: "Content", icon: FileText },
  { href: "/calendar", label: "Calendar", icon: Calendar },
  { href: "/linkedin", label: "LinkedIn", icon: Linkedin },
  { href: "/memory", label: "Memory", icon: MemoryStick },
  { href: "/team", label: "Team", icon: Users },
  { href: "/office", label: "Office", icon: Building2 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800/90 backdrop-blur border border-cyan-500/30 md:hidden cyber-glow"
      >
        {isOpen ? (
          <X className="h-5 w-5 text-cyan-400" />
        ) : (
          <Menu className="h-5 w-5 text-cyan-400" />
        )}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-40 h-screen w-64 shrink-0
          bg-slate-950/95 backdrop-blur border-r border-cyan-500/20
          transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Scanline effect */}
        <div className="absolute inset-0 scanlines pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <Zap className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-cyan-400 tracking-tight">Mission Control</h1>
                <p className="text-xs text-slate-500 font-medium">MoonlightAI</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`
                    flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 cyber-glow"
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
                    }
                  `}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-cyan-400" : ""}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-cyan-500/20">
            <div className="rounded-lg bg-slate-900/50 p-3 border border-cyan-500/10">
              <p className="text-xs text-slate-500">Powered by</p>
              <p className="text-sm font-medium text-cyan-400/80">Next.js + Convex</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
