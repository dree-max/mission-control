'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  ListTodo, 
  Film, 
  Calendar, 
  Brain, 
  Users,
  Linkedin
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Tasks', href: '/tasks', icon: ListTodo },
  { name: 'Pipeline', href: '/pipeline', icon: Film },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Memory', href: '/memory', icon: Brain },
  { name: 'Team', href: '/team', icon: Users },
  { name: 'LinkedIn', href: '/linkedin', icon: Linkedin },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-[#2a2a2a] bg-[#0a0a0a]/80 backdrop-blur sticky top-0 z-50">
      <div className="px-6">
        <div className="flex items-center h-16">
          <div className="text-xl font-bold mr-8">🦉 Mission Control</div>
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive 
                      ? 'bg-[#1a1a1a] text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
