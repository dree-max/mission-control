'use client';

import React from 'react';
import Link from 'next/link';
import { posts, seoKeywords, stats, contentPillars } from "../../lib/data";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function ContentPage() {
  const postedCount = posts.filter(p => p.status === 'posted').length;
  const pendingCount = posts.filter(p => p.status === 'pending').length;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Content Pipeline</h1>
      
      {/* Quick Links */}
      <div className="flex gap-4 mb-6">
        <Link href="/pipeline" className="text-sm text-purple-400 hover:underline">→ Content Pipeline</Link>
        <Link href="/tasks" className="text-sm text-cyan-400 hover:underline">→ Tasks</Link>
        <Link href="/team" className="text-sm text-green-400 hover:underline">→ Team</Link>
      </div>

      <div className="grid gap-6">
        {/* Content Pillars */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Content Pillars</h2>
          <ul className="space-y-2">
            {contentPillars.map((pillar, i) => (
              <li key={i}>{pillar}</li>
            ))}
          </ul>
        </div>

        {/* Publishing Schedule */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="p-2 bg-blue-900 rounded">Mon<br/>Newsletter</div>
            <div className="p-2 bg-green-900 rounded">Tue<br/>Blog Post</div>
            <div className="p-2 bg-purple-900 rounded">Wed<br/>Social</div>
            <div className="p-2 bg-green-900 rounded">Thu<br/>Blog Post</div>
            <div className="p-2 bg-purple-900 rounded">Fri<br/>Social</div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
          <div className="space-y-3">
            {posts.map((post) => (
              <div key={post.id} className="p-3 bg-zinc-800 rounded-lg">
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-zinc-400 mt-1">{post.text.substring(0, 100)}...</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-zinc-500">{formatDate(post.createdAt)} • {post.platform}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    post.status === 'posted' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                  }`}>
                    {post.status === 'posted' ? '✅ Posted' : '⏳ Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Focus */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">SEO Keywords</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-blue-400">High Priority</h3>
              <ul className="text-sm mt-2">
                {seoKeywords.high.map((kw, i) => <li key={i}>{kw}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-yellow-400">Medium Priority</h3>
              <ul className="text-sm mt-2">
                {seoKeywords.medium.map((kw, i) => <li key={i}>{kw}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Performance</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-zinc-800 rounded">
              <div className="text-2xl font-bold">{postedCount}</div>
              <div className="text-sm">Posts Published</div>
            </div>
            <div className="p-4 bg-zinc-800 rounded">
              <div className="text-2xl font-bold">{pendingCount}</div>
              <div className="text-sm">Pending Approval</div>
            </div>
            <div className="p-4 bg-zinc-800 rounded">
              <div className="text-2xl font-bold">LinkedIn</div>
              <div className="text-sm">Active Platform</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
