"use client";

import { useState } from "react";
import { Search, FileText, X } from "lucide-react";

interface Memory {
  name: string;
  content: string;
}

const mockMemories: Memory[] = [
  { name: "Project Notes", content: "# Project Notes\n\n## Goals\n- Build mission control dashboard\n- Automate content pipeline\n- Set up team workflows\n\n## Progress\n- Completed initial setup\n- Working on task board" },
  { name: "Team Decisions", content: "# Team Decisions\n\n## 2026-02-15\n- Decided to use Next.js + Convex\n- Agreed on dark theme\n- Set up MarvelSquad workflow" },
  { name: "Ideas", content: "# Ideas\n\n## Content\n- AI tools review video\n- OpenClaw tutorial series\n- Behind the scenes content" },
  { name: "Technical Stack", content: "# Technical Stack\n\n## Frontend\n- Next.js 14\n- TailwindCSS\n- TypeScript\n\n## Backend\n- Convex (Database)" },
];

export default function MemoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  const filteredMemories = mockMemories.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Memory</h1>
        <p className="text-zinc-400">All memories and conversations</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search memories..." className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filteredMemories.map((memory) => (
          <button key={memory.name} onClick={() => setSelectedMemory(memory)}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-left hover:border-zinc-700 transition-colors">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              <h3 className="font-medium">{memory.name}</h3>
            </div>
            <p className="line-clamp-3 text-sm text-zinc-500">{memory.content.replace(/[#*]/g, "").substring(0, 150)}...</p>
          </button>
        ))}
      </div>

      {selectedMemory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-3xl rounded-xl border border-zinc-800 bg-zinc-900 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-800 p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-400" />
                <h2 className="text-lg font-semibold">{selectedMemory.name}</h2>
              </div>
              <button onClick={() => setSelectedMemory(null)} className="text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="overflow-y-auto p-6">
              <pre className="whitespace-pre-wrap text-sm text-zinc-300 font-sans">{selectedMemory.content}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
