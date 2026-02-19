"use client";

import { useState, useEffect } from "react";

const getFromStorage = (key: string) => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<any[]>([]);
  
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  useEffect(() => {
    const allTasks = getFromStorage("mc_tasks");
    setTasks(allTasks.filter((t: any) => 
      t.scheduledFor >= startOfWeek.getTime() && t.scheduledFor <= endOfWeek.getTime()
    ));
  }, [currentDate]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const weekDays: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDays.push(day);
  }

  const getTasksForDay = (day: Date) => {
    return tasks.filter((task: any) => {
      const taskDate = new Date(task.scheduledFor);
      return taskDate.toDateString() === day.toDateString();
    });
  };

  const prevWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  const nextWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDateRange = () => {
    const start = startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const end = endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    return `${start} - ${end}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <div className="flex gap-2">
          <button onClick={prevWeek} className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
            ← Prev
          </button>
          <button onClick={goToToday} className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700">
            Today
          </button>
          <button onClick={nextWeek} className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
            Next →
          </button>
        </div>
      </div>

      <div className="text-xl font-semibold text-center">{formatDateRange()}</div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="grid grid-cols-8 border-b border-gray-700">
          <div className="p-2 text-center text-gray-500 text-sm"></div>
          {weekDays.map((day, i) => (
            <div
              key={i}
              className={`p-2 text-center border-l border-gray-700 ${
                day.toDateString() === new Date().toDateString() ? "bg-blue-900/50" : ""
              }`}
            >
              <div className="font-medium">{days[i]}</div>
              <div className="text-2xl">{day.getDate()}</div>
            </div>
          ))}
        </div>

        <div className="max-h-[600px] overflow-y-auto">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-gray-800">
              <div className="p-2 text-xs text-gray-500 text-right pr-4">
                {hour === 0 ? "" : `${hour}:00`}
              </div>
              {weekDays.map((day, i) => {
                const dayTasks = getTasksForDay(day).filter((task: any) => {
                  const taskHour = new Date(task.scheduledFor).getHours();
                  return taskHour === hour;
                });

                return (
                  <div
                    key={i}
                    className={`min-h-[60px] border-l border-gray-800 p-1 ${
                      day.toDateString() === new Date().toDateString() ? "bg-blue-900/30" : ""
                    }`}
                  >
                    {dayTasks.map((task: any) => (
                      <div
                        key={task.id}
                        className={`text-xs p-1 rounded mb-1 ${
                          task.status === "completed"
                            ? "bg-green-900 text-green-300"
                            : task.status === "in_progress"
                            ? "bg-blue-900 text-blue-300"
                            : "bg-purple-900 text-purple-300"
                        }`}
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="glass p-4 rounded-xl">
        <h3 className="font-semibold mb-2">All Tasks This Week</h3>
        {tasks.length > 0 ? (
          <ul className="space-y-2">
            {tasks.map((task: any) => (
              <li key={task.id} className="flex justify-between items-center text-sm">
                <span>{task.title}</span>
                <span className="text-gray-500">
                  {new Date(task.scheduledFor).toLocaleString("en-US", {
                    weekday: "short",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No tasks scheduled this week</p>
        )}
      </div>
    </div>
  );
}
