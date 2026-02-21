"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

type EventType = "cron" | "task" | "meeting" | "content" | "other";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  eventType: EventType;
}

const eventTypeColors: Record<EventType, { bg: string; text: string; label: string; border: string }> = {
  cron: { bg: "bg-blue-600/20", text: "text-blue-400", label: "Cron Job", border: "border-blue-600/30" },
  task: { bg: "bg-orange-600/20", text: "text-orange-400", label: "Task", border: "border-orange-600/30" },
  meeting: { bg: "bg-purple-600/20", text: "text-purple-400", label: "Meeting", border: "border-purple-600/30" },
  content: { bg: "bg-green-600/20", text: "text-green-400", label: "Content", border: "border-green-600/30" },
  other: { bg: "bg-zinc-600/20", text: "text-zinc-400", label: "Other", border: "border-zinc-600/30" },
};

const initialEvents: Event[] = [
  { id: "1", title: "Daily Backup", description: "Auto-backup workspace", date: new Date(), eventType: "cron" },
  { id: "2", title: "LinkedIn Post", description: "Post scheduled content", date: new Date(), eventType: "content" },
  { id: "3", title: "Team Standup", description: "Daily sync", date: new Date(Date.now() + 86400000), eventType: "meeting" },
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", eventType: "task" as EventType });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const getEventsForDay = (date: Date) => events.filter(e => isSameDay(e.date, date));

  const addEvent = () => {
    if (!newEvent.title || !selectedDate) return;
    setEvents([...events, { id: Date.now().toString(), ...newEvent, date: selectedDate }]);
    setShowAddModal(false);
    setNewEvent({ title: "", description: "", eventType: "task" });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">{format(currentDate, "MMMM yyyy")}</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="rounded-lg p-2 hover:bg-zinc-800"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => setCurrentDate(new Date())} className="rounded-lg px-3 py-1 text-sm hover:bg-zinc-800">Today</button>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="rounded-lg p-2 hover:bg-zinc-800"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        {Object.values(eventTypeColors).map((c) => (
          <div key={c.label} className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${c.bg}`} />
            <span className="text-xs text-zinc-400">{c.label}</span>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-zinc-800">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="p-3 text-center text-sm font-medium text-zinc-400">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[100px] border-r border-b border-zinc-800 bg-zinc-950/30" />
          ))}
          {days.map(day => {
            const dayEvents = getEventsForDay(day);
            const isToday = isSameDay(day, new Date());
            return (
              <div key={day.toISOString()} onClick={() => { setSelectedDate(day); setShowAddModal(true); }}
                className="min-h-[100px] cursor-pointer border-r border-b border-zinc-800 p-2 hover:bg-zinc-800/50">
                <div className={`mb-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${isToday ? "bg-blue-600 text-white" : ""}`}>
                  {format(day, "d")}
                </div>
                <div className="space-y-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div key={event.id} className={`truncate rounded px-1 py-0.5 text-xs border ${eventTypeColors[event.eventType].bg} ${eventTypeColors[event.eventType].text} ${eventTypeColors[event.eventType].border}`}>
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showAddModal && selectedDate && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add Event - {format(selectedDate, "MMM d, yyyy")}</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Title</label>
                <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm" placeholder="Event title" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Event Type</label>
                <select value={newEvent.eventType} onChange={(e) => setNewEvent({...newEvent, eventType: e.target.value as EventType})}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm">
                  {Object.entries(eventTypeColors).map(([type, c]) => (<option key={type} value={type}>{c.label}</option>))}
                </select>
              </div>
              <button onClick={addEvent} className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium hover:bg-blue-700">Add Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
