"use client";

import { useState } from "react";
import { Plus, X, FileText, Image } from "lucide-react";
import Link from "next/link";
import { contentItems as initialContent, ContentItem, ContentStage } from "../../lib/data";

const stages: ContentStage[] = ["Ideas", "Script", "Thumbnail", "Filming", "Published"];

const stageColors: Record<ContentStage, string> = {
  "Ideas": "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
  "Script": "bg-blue-600/20 text-blue-400 border-blue-600/30",
  "Thumbnail": "bg-purple-600/20 text-purple-400 border-purple-600/30",
  "Filming": "bg-red-600/20 text-red-400 border-red-600/30",
  "Published": "bg-green-600/20 text-green-400 border-green-600/30",
};

export default function PipelinePage() {
  const [content, setContent] = useState<ContentItem[]>(initialContent);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", notes: "" });

  const moveContent = (itemId: string, newStage: ContentStage) => {
    setContent(content.map(c => c.id === itemId ? { ...c, stage: newStage } : c));
  };

  const addContent = () => {
    if (!newItem.title) return;
    const item: ContentItem = { 
      id: Date.now().toString(), 
      ...newItem, 
      script: "", 
      images: [], 
      stage: "Ideas",
      status: "draft",
      createdAt: new Date().toISOString().split('T')[0]
    };
    setContent([...content, item]);
    setShowAddModal(false);
    setNewItem({ title: "", notes: "" });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Content Pipeline</h1>
          <p className="text-zinc-400">Track content from idea to publish</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700">
          <Plus className="h-4 w-4" /> Add Content
        </button>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4 mb-6">
        <Link href="/tasks" className="text-sm text-cyan-400 hover:underline">→ Tasks</Link>
        <Link href="/content" className="text-sm text-purple-400 hover:underline">→ Content Strategy</Link>
        <Link href="/team" className="text-sm text-green-400 hover:underline">→ Team</Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageContent = content.filter(c => c.stage === stage);
          return (
            <div key={stage} className="min-w-[280px] flex-1 rounded-xl bg-zinc-900/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-medium text-zinc-300">{stage}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs border ${stageColors[stage]}`}>
                  {stageContent.length}
                </span>
              </div>
              <div className="space-y-3">
                {stageContent.map((item) => (
                  <div key={item.id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 hover:border-zinc-700 cursor-pointer"
                    draggable onDragStart={(e) => e.dataTransfer.setData("contentId", item.id)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData("contentId"); moveContent(id, stage); }}
                  >
                    <p className="font-medium">{item.title}</p>
                    {item.notes && <p className="text-xs text-zinc-500 mt-2 line-clamp-2">{item.notes}</p>}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.script && <span className="flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"><FileText className="h-3 w-3" />Script</span>}
                        {item.images.length > 0 && <span className="flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400"><Image className="h-3 w-3" />{item.images.length}</span>}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        item.status === "posted" ? "bg-green-900/50 text-green-400" :
                        item.status === "pending" ? "bg-yellow-900/50 text-yellow-400" :
                        "bg-slate-700 text-slate-400"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add Content</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Title</label>
                <input type="text" value={newItem.title} onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm" placeholder="Content title" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Notes</label>
                <textarea value={newItem.notes} onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm" rows={3} placeholder="Initial notes" />
              </div>
              <button onClick={addContent} className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium hover:bg-blue-700">Add to Pipeline</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
