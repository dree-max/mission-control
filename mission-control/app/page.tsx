import Link from 'next/link'
import { 
  LayoutDashboard, 
  ListTodo, 
  Film, 
  Calendar, 
  Brain, 
  Users,
  Linkedin,
  ArrowRight
} from 'lucide-react'

const components = [
  {
    name: 'Tasks Board',
    description: 'Track all tasks - who\'s working on what',
    href: '/tasks',
    icon: ListTodo,
    color: 'bg-blue-500',
  },
  {
    name: 'Content Pipeline',
    description: 'YouTube & Blog workflows',
    href: '/pipeline',
    icon: Film,
    color: 'bg-red-500',
  },
  {
    name: 'Calendar',
    description: 'Scheduled tasks and cron jobs',
    href: '/calendar',
    icon: Calendar,
    color: 'bg-green-500',
  },
  {
    name: 'Memory',
    description: 'Searchable log of all memories',
    href: '/memory',
    icon: Brain,
    color: 'bg-purple-500',
  },
  {
    name: 'Team',
    description: 'Agent roster and status',
    href: '/team',
    icon: Users,
    color: 'bg-orange-500',
  },
  {
    name: 'LinkedIn',
    description: 'Post to your company page',
    href: '/linkedin',
    icon: Linkedin,
    color: 'bg-[#0077b5]',
  },
]

export default function Home() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mission Control</h1>
        <p className="text-gray-400">MoonlightAI Squad Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="group block p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:border-gray-600 transition-colors"
          >
            <div className={`w-12 h-12 ${component.color} rounded-lg flex items-center justify-center mb-4`}>
              <component.icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
              {component.name}
            </h2>
            <p className="text-gray-400 text-sm">{component.description}</p>
            <div className="mt-4 flex items-center text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              Open <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
