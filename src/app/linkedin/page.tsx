"use client";

import { useState } from "react";
import { Check, X, Image, Clock, Send, Plus, Trash2, Wand2, Eye } from "lucide-react";

interface LinkedInPost {
  id: string;
  title: string;
  text: string;
  originalText?: string;
  imageUrl?: string;
  status: "draft" | "humanized" | "pending" | "approved" | "posted" | "rejected";
  createdAt: string;
  postedAt?: string;
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
  },
  {
    id: "2",
    title: "AI Tools Post",
    text: "What's your favorite AI tool?",
    originalText: "Just discovered some amazing AI tools for content creators! Here's my top picks:\n\n1. OpenClaw - Autonomous AI assistant\n2. Claude - AI assistant\n3. Codex - AI coding assistant\n\nWhat's your favorite AI tool?",
    imageUrl: "",
    status: "draft",
    createdAt: "2026-02-21T07:00:00Z",
  },
];

export default function LinkedInPage() {
  const [posts, setPosts] = useState<LinkedInPost[]>(initialPosts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", text: "", imageUrl: "" });
  const [humanizing, setHumanizing] = useState<string | null>(null);

  const draftPosts = posts.filter(p => p.status === "draft");
  const humanizedPosts = posts.filter(p => p.status === "humanized");
  const pendingPosts = posts.filter(p => p.status === "pending");
  const approvedPosts = posts.filter(p => p.status === "approved");
  const postedPosts = posts.filter(p => p.status === "posted");

  // Simulated humanizer - replaces AI patterns with natural language
  const humanizeText = (text: string): string => {
    let result = text;
    
    // Remove AI filler words
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
    result = result.replace(/for example|for instance|g, "like");
    result = result.replace(/each and every/g, "every");
    
    // Clean up
    result = result.replace(/\s+/g, " ").trim();
    
    // Add human touch if no question
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

  const addPost = () => {
    if (!newPost.title || !newPost.text) return;
    const post: LinkedInPost = {
      id: Date.now().toString(),
      ...newPost,
      status: "draft",
      createdAt: new Date().toISOString(),
    };
    setPosts([post, ...posts]);
    setShowAddModal(false);
    setNewPost({ title: "", text: "", imageUrl: "" });
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">LinkedIn</h1>
          <p className="text-zinc-400">Content pipeline with humanizer</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium hover:bg-blue-700">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
          <p className="text-xs text-zinc-400">Draft</p>
          <p className="text-xl font-bold text-zinc-400">{draftPosts.length}</p>
        </div>
        <div className="rounded-xl border border-purple-800 bg-purple-900/20 p-3">
          <p className="text-xs text-purple-400">Humanized</p>
          <p className="text-xl font-bold text-purple-400">{humanizedPosts.length}</p>
        </div>
        <div className="rounded-xl border border-yellow-800 bg-yellow-900/20 p-3">
          <p className="text-xs text-yellow-400">Pending</p>
          <p className="text-xl font-bold text-yellow-400">{pendingPosts.length}</p>
        </div>
        <div className="rounded-xl border border-blue-800 bg-blue-900/20 p-3">
          <p className="text-xs text-blue-400">Approved</p>
          <p className="text-xl font-bold text-blue-400">{approvedPosts.length}</p>
        </div>
        <div className="rounded-xl border border-green-800 bg-green-900/20 p-3">
          <p className="text-xs text-green-400">Posted</p>
          <p className="text-xl font-bold text-green-400">{postedPosts.length}</p>
        </div>
      </div>

      {/* Draft Posts */}
      {draftPosts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-zinc-400 mb-3">Draft - Ready for Humanizer</h2>
          <div className="space-y-3">
            {draftPosts.map(post => (
              <div key={post.id} className="rounded-xl border border-zinc-700 bg-zinc-800/50 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-white">{post.title}</h3>
                      <span className="rounded px-2 py-0.5 text-xs bg-zinc-700 text-zinc-400">Draft</span>
                    </div>
                    <pre className="text-sm text-zinc-400 whitespace-pre-wrap font-sans line-clamp-3">{post.text}</pre>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button 
                      onClick={() => humanizePost(post.id)} 
                      disabled={humanizing === post.id}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-sm"
                    >
                      <Wand2 className="h-4 w-4" />
                      {humanizing === post.id ? "Humanizing..." : "Humanize"}
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
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-purple-400 mb-3">Humanized - Review Changes</h2>
          <div className="space-y-3">
            {humanizedPosts.map(post => (
              <div key={post.id} className="rounded-xl border border-purple-600/30 bg-purple-900/10 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{post.title}</h3>
                    <span className="rounded px-2 py-0.5 text-xs bg-purple-600/20 text-purple-400">Humanized</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => submitForApproval(post.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm">
                      Submit
                    </button>
                  </div>
                </div>
                {/* Show comparison */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Original</p>
                    <pre className="text-xs text-zinc-500 whitespace-pre-wrap font-sans bg-zinc-900 p-2 rounded">{post.originalText || post.text}</pre>
                  </div>
                  <div>
                    <p className="text-xs text-green-400 mb-1">Humanized</p>
                    <pre className="text-xs text-green-300 whitespace-pre-wrap font-sans bg-zinc-900 p-2 rounded">{post.text}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Posts - Needs Approval */}
      {pendingPosts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-yellow-400 mb-3">Needs Your Approval</h2>
          <div className="space-y-3">
            {pendingPosts.map(post => (
              <div key={post.id} className="rounded-xl border border-yellow-600/30 bg-yellow-900/10 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-white">{post.title}</h3>
                      <span className="rounded px-2 py-0.5 text-xs bg-yellow-600/20 text-yellow-400">Pending</span>
                    </div>
                    <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans">{post.text}</pre>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button onClick={() => approvePost(post.id)} className="p-2 rounded-lg bg-green-600 hover:bg-green-700">
                      <Check className="h-5 w-5 text-white" />
                    </button>
                    <button onClick={() => rejectPost(post.id)} className="p-2 rounded-lg bg-red-600 hover:bg-red-700">
                      <X className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Approved - Ready to Post */}
      {approvedPosts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-blue-400 mb-3">Approved - Ready to Post</h2>
          <div className="space-y-3">
            {approvedPosts.map(post => (
              <div key={post.id} className="rounded-xl border border-blue-600/30 bg-blue-900/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-white">{post.title}</h3>
                    <p className="text-xs text-zinc-500">Will be posted by Quill</p>
                  </div>
                  <span className="rounded px-2 py-0.5 text-xs bg-blue-600/20 text-blue-400">Approved</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posted History */}
      <div>
        <h2 className="text-sm font-semibold text-green-400 mb-3">Posted</h2>
        <div className="space-y-2">
          {postedPosts.map(post => (
            <div key={post.id} className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-zinc-300">{post.title}</h3>
                <span className="rounded px-2 py-0.5 text-xs bg-green-600/20 text-green-400">Posted</span>
              </div>
            </div>
          ))}
          {postedPosts.length === 0 && <p className="text-zinc-500 text-sm">No posts published yet</p>}
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-6 max-h-[80vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">New Post</h2>
              <button onClick={() => setShowAddModal(false)} className="text-zinc-400 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Title</label>
                <input type="text" value={newPost.title} onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm" placeholder="Post title" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Content</label>
                <textarea value={newPost.text} onChange={(e) => setNewPost({...newPost, text: e.target.value})}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm" rows={6} placeholder="What's on your mind?" />
              </div>
              <div>
                <label className="mb-1 block text-sm text-zinc-400">Image URL</label>
                <input type="text" value={newPost.imageUrl} onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm" placeholder="https://..." />
              </div>
              <button onClick={addPost} className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium hover:bg-blue-700">Create Draft</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
