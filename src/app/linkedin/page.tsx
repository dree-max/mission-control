"use client";

import { useState, useEffect } from "react";
import { Check, X, Image, Clock, Send, Plus, Trash2, Wand2, Zap, ArrowRight, Loader2 } from "lucide-react";

interface LinkedInPost {
  id: string;
  title: string;
  text: string;
  originalText?: string;
  imageUrl?: string;
  status: "draft" | "humanized" | "pending" | "approved" | "posted" | "rejected";
  createdAt: string;
  postedAt?: string;
  agent?: string;
}

const initialPosts: LinkedInPost[] = [
  {
    id: "1",
    title: "Productivity Tips",
    text: "What's your top productivity hack?",
    originalText: "5 Productivity Tips That Changed My Workflow:\n\n1. Use AI to automate repetitive tasks\n2. Set up cron jobs for routine work\n3. Build a personal command center\n4. Automate your content pipeline\n5. Delegate to AI agents\n\nWhat's your top productivity hack?",
    imageUrl: "",
    status: "pending",
    createdAt: "2026-02-21T08:00:00Z",
    agent: "Kagu",
  },
  {
    id: "2",
    title: "AI Tools Post",
    text: "What's your favorite AI tool?",
    originalText: "Just discovered some amazing AI tools for content creators! Here's my top picks:\n\n1. OpenClaw - Autonomous AI assistant\n2. Claude - AI assistant\n3. Codex - AI coding assistant\n\nWhat's your favorite AI tool?",
    imageUrl: "",
    status: "draft",
    createdAt: "2026-02-21T07:00:00Z",
    agent: "MarvelSquad",
  },
];

export default function LinkedInPage() {
  const [posts, setPosts] = useState<LinkedInPost[]>(initialPosts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", text: "", imageUrl: "" });
  const [humanizing, setHumanizing] = useState<string | null>(null);
  const [posting, setPosting] = useState<string | null>(null);
  const [autoPostEnabled, setAutoPostEnabled] = useState(true);

  const draftPosts = posts.filter(p => p.status === "draft");
  const humanizedPosts = posts.filter(p => p.status === "humanized");
  const pendingPosts = posts.filter(p => p.status === "pending");
  const approvedPosts = posts.filter(p => p.status === "approved");
  const postedPosts = posts.filter(p => p.status === "posted");

  // Simulated humanizer - replaces AI patterns with natural language
  const humanizeText = (text: string): string => {
    let result = text;

    result = result.replace(/stands as|serves as/g, "is");
    result = result.replace(/a testament to|a reminder/g, "shows");
    result = result.replace(/vital|crucial|pivotal|key role/g, "important");
    result = result.replace(/underscores|highlights/g, "shows");
    result = result.replace(/leverage|utilize/g, "use");
    result = result.replace(/meticulously|seamlessly|effortlessly/g, "");
    result = result.replace(/revolutionize|transform/g, "change");
    result = result.replace(/empower|unlock/g, "help");
    result = result.replace(/moreover|furthermore|additionally/g, "also");
    result = result.replace(/consequently|nevertheless|accordingly/g, "but");
    result = result.replace(/essentially|fundamentally|importantly/g, "");
    result = result.replace(/In today's world|In the current landscape/g, "Now");
    result = result.replace(/for example|for instance/g, "like");
    result = result.replace(/each and every/g, "every");

    result = result.replace(/\s+/g, " ").trim();

    if (!result.includes("?")) {
      const touches = ["What do you think?", "Curious to hear your thoughts.", "Thoughts?"];
      result += " " + touches[Math.floor(Math.random() * touches.length)];
    }

    return result;
  };

  const humanizePost = (id: string) => {
    setHumanizing(id);
    setTimeout(() => {
      setPosts(posts.map(p => {
        if (p.id === id) {
          return {
            ...p,
            originalText: p.text,
            text: humanizeText(p.text),
            status: "humanized" as const
          };
        }
        return p;
      }));
      setHumanizing(null);
    }, 500);
  };

  const submitForApproval = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, status: "pending" } : p));
  };

  const approvePost = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, status: "approved" } : p));
  };

  const rejectPost = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, status: "rejected" } : p));
  };

  // Auto-post approved posts
  useEffect(() => {
    if (!autoPostEnabled) return;

    const approved = posts.filter(p => p.status === "approved");
    approved.forEach(post => {
      setTimeout(() => {
        setPosting(post.id);
        setTimeout(() => {
          setPosts(p => p.map(item =>
            item.id === post.id
              ? { ...item, status: "posted" as const, postedAt: new Date().toISOString() }
              : item
          ));
          setPosting(null);
        }, 2000);
      }, 1000);
    });
  }, [posts, autoPostEnabled]);

  const manualPost = (id: string) => {
    setPosting(id);
    setTimeout(() => {
      setPosts(p => p.map(item =>
        item.id === id
          ? { ...item, status: "posted" as const, postedAt: new Date().toISOString() }
          : item
      ));
      setPosting(null);
    }, 2000);
  };

  const addPost = (agent: string = "Manual") => {
    if (!newPost.title || !newPost.text) return;
    const post: LinkedInPost = {
      id: Date.now().toString(),
      ...newPost,
      status: "draft",
      createdAt: new Date().toISOString(),
      agent,
    };
    setPosts([post, ...posts]);
    setShowAddModal(false);
    setNewPost({ title: "", text: "", imageUrl: "" });
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
            <Send className="h-6 w-6" />
            LinkedIn Pipeline
          </h1>
          <p className="text-slate-400">Content workflow with auto-post enabled</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-400">
            <input
              type="checkbox"
              checked={autoPostEnabled}
              onChange={(e) => setAutoPostEnabled(e.target.checked)}
              className="rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
            />
            Auto-post approved
          </label>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 px-4 py-2 text-sm font-medium text-white transition-all cyber-glow"
          >
            <Plus className="h-4 w-4" /> New Post
          </button>
        </div>
      </div>

      {/* Stats - Responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <div className="cyber-card rounded-xl p-3">
          <p className="text-xs text-slate-400">Draft</p>
          <p className="text-2xl font-bold text-slate-400">{draftPosts.length}</p>
        </div>
        <div className="cyber-card rounded-xl p-3">
          <p className="text-xs text-purple-400">Humanized</p>
          <p className="text-2xl font-bold text-purple-400">{humanizedPosts.length}</p>
        </div>
        <div className="cyber-card rounded-xl p-3">
          <p className="text-xs text-yellow-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">{pendingPosts.length}</p>
        </div>
        <div className="cyber-card rounded-xl p-3">
          <p className="text-xs text-cyan-400">Approved</p>
          <p className="text-2xl font-bold text-cyan-400">{approvedPosts.length}</p>
        </div>
        <div className="cyber-card rounded-xl p-3 col-span-2 sm:col-span-1">
          <p className="text-xs text-green-400">Posted</p>
          <p className="text-2xl font-bold text-green-400">{postedPosts.length}</p>
        </div>
      </div>

      {/* Draft Posts */}
      {draftPosts.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4" /> Draft - Ready for Humanizer
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {draftPosts.map(post => (
              <div key={post.id} className="cyber-card rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-medium text-white truncate">{post.title}</h3>
                      {post.agent && (
                        <span className="rounded px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">
                          {post.agent}
                        </span>
                      )}
                      <span className="rounded px-2 py-0.5 text-xs bg-slate-700 text-slate-400">Draft</span>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-3">{post.text}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => humanizePost(post.id)}
                      disabled={humanizing === post.id}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-sm text-white transition-all"
                    >
                      <Wand2 className="h-4 w-4" />
                      {humanizing === post.id ? "..." : "Humanize"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Humanized Posts - Review */}
      {humanizedPosts.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-purple-400 mb-3">Humanized - Review Changes</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {humanizedPosts.map(post => (
              <div key={post.id} className="cyber-card rounded-xl p-4 border-purple-500/30">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{post.title}</h3>
                    <span className="rounded px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">Humanized</span>
                  </div>
                  <button
                    onClick={() => submitForApproval(post.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-sm text-white transition-all"
                  >
                    Submit <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {/* Show comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Original</p>
                    <p className="text-xs text-slate-500 bg-slate-900 p-2 rounded">{post.originalText || post.text}</p>
                  </div>
                  <div>
                    <p className="text-xs text-green-400 mb-1">Humanized</p>
                    <p className="text-xs text-green-300 bg-slate-900 p-2 rounded">{post.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Posts - Needs Approval */}
      {pendingPosts.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-yellow-400 mb-3">Needs Your Approval</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {pendingPosts.map(post => (
              <div key={post.id} className="cyber-card rounded-xl p-4 border-yellow-500/30">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-medium text-white">{post.title}</h3>
                      <span className="rounded px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">Pending</span>
                    </div>
                    <p className="text-sm text-slate-300 line-clamp-4">{post.text}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => approvePost(post.id)}
                      className="p-2 rounded-lg bg-green-600 hover:bg-green-500 transition-all"
                      title="Approve"
                    >
                      <Check className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={() => rejectPost(post.id)}
                      className="p-2 rounded-lg bg-red-600 hover:bg-red-500 transition-all"
                      title="Reject"
                    >
                      <X className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved - Ready to Post / Auto-posting */}
      {approvedPosts.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
            {autoPostEnabled ? <Zap className="h-4 w-4 animate-pulse" /> : <Send className="h-4 w-4" />}
            {autoPostEnabled ? "Auto-Posting..." : "Approved - Ready to Post"}
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {approvedPosts.map(post => (
              <div key={post.id} className="cyber-card rounded-xl p-4 border-cyan-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">{post.title}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      {autoPostEnabled ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" /> Posting to LinkedIn...
                        </>
                      ) : (
                        <>
                          <Send className="h-3 w-3" /> Ready to post via Quill
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded px-2 py-0.5 text-xs bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Approved</span>
                    {!autoPostEnabled && (
                      <button
                        onClick={() => manualPost(post.id)}
                        disabled={posting === post.id}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-sm text-white transition-all"
                      >
                        {posting === post.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        Post
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posted History */}
      <div>
        <h2 className="text-sm font-semibold text-green-400 mb-3">Posted to LinkedIn</h2>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {postedPosts.map(post => (
            <div key={post.id} className="cyber-card rounded-lg p-3 border-green-500/20">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <h3 className="text-sm text-slate-300 truncate">{post.title}</h3>
                  <p className="text-xs text-slate-500">
                    {post.postedAt ? new Date(post.postedAt).toLocaleDateString() : ""}
                  </p>
                </div>
                <span className="rounded px-2 py-0.5 text-xs bg-green-500/20 text-green-400 border border-green-500/30 shrink-0">
                  Posted
                </span>
              </div>
            </div>
          ))}
          {postedPosts.length === 0 && (
            <p className="text-slate-500 text-sm col-span-full">No posts published yet</p>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 p-4">
          <div className="w-full max-w-lg cyber-card rounded-xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">New Post</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-400">Agent (optional)</label>
                <select
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm"
                  onChange={(e) => {
                    if (e.target.value) addPost(e.target.value);
                  }}
                >
                  <option value="">Select agent...</option>
                  <option value="Kagu">Kagu</option>
                  <option value="MarvelSquad">MarvelSquad</option>
                  <option value="Jarvis">Jarvis</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-400">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                  placeholder="Post title"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-400">Content</label>
                <textarea
                  value={newPost.text}
                  onChange={(e) => setNewPost({...newPost, text: e.target.value})}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                  rows={6}
                  placeholder="What's on your mind?"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-slate-400">Image URL</label>
                <input
                  type="text"
                  value={newPost.imageUrl}
                  onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
                  placeholder="https://..."
                />
              </div>
              <button
                onClick={() => addPost("Manual")}
                className="w-full rounded-lg bg-cyan-600 py-2 text-sm font-medium hover:bg-cyan-500 text-white transition-all cyber-glow"
              >
                Create Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
