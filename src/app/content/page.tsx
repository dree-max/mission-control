'use client';

import React from 'react';

export default function ContentStrategyPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Content Strategy</h1>
      
      <div className="grid gap-6">
        {/* Content Pillars */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Content Pillars</h2>
          <ul className="space-y-2">
            <li>🧠 <strong>AI Education & Thought Leadership</strong> - Position as authority</li>
            <li>📊 <strong>Case Studies & Success Stories</strong> - Build credibility</li>
            <li>💻 <strong>Product & Technical Content</strong> - Support buying journey</li>
            <li>🏥 <strong>Industry-Specific Solutions</strong> - Target vertical markets</li>
            <li>📝 <strong>How-To & Implementation Guides</strong> - Reduce friction</li>
          </ul>
        </div>

        {/* Publishing Schedule */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="p-2 bg-blue-900 rounded">Mon<br/>Newsletter</div>
            <div className="p-2 bg-green-900 rounded">Tue<br/>Blog Post</div>
            <div className="p-2 bg-purple-900 rounded">Wed<br/>Social</div>
            <div className="p-2 bg-green-900 rounded">Thu<br/>Blog Post</div>
            <div className="p-2 bg-purple-900 rounded">Fri<br/>Social</div>
          </div>
        </div>

        {/* SEO Focus */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">SEO Keywords</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-blue-400">High Priority</h3>
              <ul className="text-sm mt-2">
                <li>AI solutions for business</li>
                <li>enterprise AI implementation</li>
                <li>AI consulting services</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-yellow-400">Medium Priority</h3>
              <ul className="text-sm mt-2">
                <li>AI for small business</li>
                <li>machine learning consulting</li>
                <li>AI strategy consulting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Targets</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gray-700 rounded">
              <div className="text-2xl font-bold">2,000</div>
              <div className="text-sm">Monthly Visits (M3)</div>
            </div>
            <div className="p-4 bg-gray-700 rounded">
              <div className="text-2xl font-bold">500</div>
              <div className="text-sm">Email Subs (M3)</div>
            </div>
            <div className="p-4 bg-gray-700 rounded">
              <div className="text-2xl font-bold">20</div>
              <div className="text-sm">MQLs (M3)</div>
            </div>
          </div>
        </div>

        {/* Next Post */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Current Task</h2>
          <div className="p-4 bg-green-900 rounded">
            <p className="font-medium">📝 "AI Implementation Best Practices: A Complete Guide for 2026"</p>
            <p className="text-sm text-gray-300 mt-2">Status: In Progress | Words: 1,500-2,500 | For: Approval</p>
          </div>
        </div>
      </div>
    </div>
  );
}
