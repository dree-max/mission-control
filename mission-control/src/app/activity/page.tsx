"use client";

import { useState, useEffect } from "react";

const getFromStorage = (key: string) => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export default function ActivityPage() {
  const [filter, setFilter] = useState<string>("all");
  const [limit, setLimit] = useState(50);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    let data = getFromStorage("mc_activities");
    if (filter !== "all") {
      data = data.filter((a: any) => a.agent === filter);
    }
    setActivities(data.slice(0, limit));
  }, [filter, limit]);

  const agents = ["all", "Kagu", "Researcher", "Content", "SEO"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Activity Feed</h1>
        <div className="flex gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          >
            {agents.map((agent) => (
              <option key={agent} value={agent === "all" ? "all" : agent}>
                {agent === "all" ? "All Agents" : agent}
              </option>
            ))}
          </select>
          
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
          >
            <option value={25}>25 items</option>
            <option value={50}>50 items</option>
            <option value={100}>100 items</option>
          </select>
        </div>
      </div>

      <div className="glass rounded-xl p-6">
        {activities.length > 0 ? (
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-700"></div>
            <ul className="space-y-6">
              {activities.map((activity: any, index: number) => (
                <li key={activity.id || index} className="relative pl-16">
                  <div className="absolute left-6 w-5 h-5 rounded-full bg-blue-500 border-4 border-gray-900"></div>
                  <div className="glass p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-blue-400 font-semibold">
                          {activity.agent}
                        </span>
                        <span className="text-gray-400 mx-2">•</span>
                        <span className="text-purple-400">{activity.action}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-300">{activity.description}</p>
                    {activity.status && (
                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                        activity.status === "completed" ? "bg-green-900 text-green-300" :
                        activity.status === "in_progress" ? "bg-blue-900 text-blue-300" :
                        "bg-gray-700 text-gray-300"
                      }`}>
                        {activity.status}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-12">No activities recorded yet</p>
        )}
      </div>
    </div>
  );
}
