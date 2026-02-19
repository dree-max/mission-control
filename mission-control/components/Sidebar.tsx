"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: "🏠" },
  { href: "/activity", label: "Activity Feed", icon: "📋" },
  { href: "/calendar", label: "Calendar", icon: "📅" },
  { href: "/search", label: "Search", icon: "🔍" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Mission Control</h1>
        <p className="text-sm text-gray-400">MoonlightAI</p>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="glass p-4 rounded-lg">
          <h3 className="font-medium mb-2">Agents</h3>
          <div className="space-y-1 text-sm text-gray-400">
            <p>🦉 Kagu - Squad Lead</p>
            <p>🔬 Researcher</p>
            <p>✍️ Content</p>
            <p>📈 SEO</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
