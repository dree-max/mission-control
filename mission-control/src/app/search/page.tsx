"use client";

import { useState, useEffect } from "react";

const getFromStorage = (key: string) => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [memories, setMemories] = useState<any[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setMemories([]);
      return;
    }

    const q = query.toLowerCase();
    
    // Search activities
    const activities = getFromStorage("mc_activities");
    const matchedActivities = activities.filter((a: any) =>
      a.description?.toLowerCase().includes(q) ||
      a.action?.toLowerCase().includes(q) ||
      a.agent?.toLowerCase().includes(q)
    ).slice(0, 10).map((a: any) => ({
      type: "activity",
      title: `${a.agent}: ${a.action}`,
      description: a.description,
      id: a.id,
    }));

    // Search tasks
    const tasks = getFromStorage("mc_tasks");
    const matchedTasks = tasks.filter((t: any) =>
      t.title?.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q)
    ).slice(0, 10).map((t: any) => ({
      type: "task",
      title: t.title,
      description: t.description || "",
      id: t.id,
    }));

    // Search memories
    const storedMemories = getFromStorage("mc_memories");
    const matchedMemories = storedMemories.filter((m: any) =>
      m.title?.toLowerCase().includes(q) ||
      m.content?.toLowerCase().includes(q)
    ).slice(0, 10);

    setResults([...matchedActivities, ...matchedTasks]);
    setMemories(matchedMemories);
  }, [query]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Global Search</h1>
      
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search activities, tasks, memories..."
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-blue-500"
          autoFocus
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
          🔍
        </span>
      </div>

      {query.length < 2 && (
        <p className="text-gray-500 text-center py-12">
          Type at least 2 characters to search...
        </p>
      )}

      {query.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📋 Activities & Tasks
            </h2>
            {results.length > 0 ? (
              <ul className="space-y-3">
                {results.map((result: any, i: number) => (
                  <li
                    key={result.id || i}
                    className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        result.type === "activity"
                          ? "bg-blue-900 text-blue-300"
                          : "bg-purple-900 text-purple-300"
                      }`}>
                        {result.type}
                      </span>
                      <span className="font-medium">{result.title}</span>
                    </div>
                    <p className="text-sm text-gray-400">{result.description}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No results found</p>
            )}
          </div>

          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🧠 Memories
            </h2>
            {memories.length > 0 ? (
              <ul className="space-y-3">
                {memories.map((memory: any, i: number) => (
                  <li
                    key={memory.id || i}
                    className="p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-green-900 text-green-300">
                        {memory.category}
                      </span>
                      <span className="font-medium">{memory.title}</span>
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {memory.content}
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      Updated: {new Date(memory.updatedAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No memories found</p>
            )}
          </div>
        </div>
      )}

      {query.length >= 2 && results.length === 0 && memories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No results found for "{query}"</p>
          <p className="text-gray-600 mt-2">Try different keywords</p>
        </div>
      )}
    </div>
  );
}
