'use client';

import React from 'react';
import { Rocket, Zap, Globe, Code, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: Zap,
    title: "AI Agent Development",
    description: "Custom AI agents built on OpenClaw framework to automate your business processes.",
    features: ["24/7 autonomous operation", "Multi-channel integration", "Custom workflows", "Smart task delegation"],
    price: "$500/month",
    color: "cyan"
  },
  {
    icon: Rocket,
    title: "Content Automation",
    description: "AI-powered content creation and distribution for your brand.",
    features: ["Automated blog posts", "Social media scheduling", "LinkedIn posting", "Content strategy"],
    price: "$300/month",
    color: "purple"
  },
  {
    icon: Globe,
    title: "Website Development",
    description: "Modern, fast websites built with Next.js and AI integration.",
    features: ["Responsive design", "SEO optimized", "CMS integration", "AI chat assistants"],
    price: "$800/one-time",
    color: "green"
  },
  {
    icon: Code,
    title: "Custom Integrations",
    description: "Connect your business tools with powerful AI automation.",
    features: ["API development", "Third-party integrations", "Workflow automation", "Data sync"],
    price: "$400/one-time",
    color: "orange"
  }
];

const colors = {
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  green: "text-green-400 bg-green-500/10 border-green-500/20",
  orange: "text-orange-400 bg-orange-500/10 border-orange-500/20"
};

export default function ServicesPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">
          MoonlightAI Solutions
        </h1>
        <p className="text-xl text-zinc-400 mb-6">
          AI-powered services to transform your business
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition-colors">
            <MessageCircle className="h-5 w-5" />
            Get Started
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors">
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="cyber-card rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className={`inline-flex p-3 rounded-lg ${colors[service.color as keyof typeof colors]} mb-4`}>
                <Icon className={`h-6 w-6 text-${service.color}-400`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-zinc-400 mb-4">{service.description}</p>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">{service.price}</span>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors">
                  Learn More <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Why Choose Us */}
      <div className="cyber-card rounded-xl p-8 border border-zinc-800">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="inline-flex p-3 rounded-lg bg-green-500/10 border border-green-500/20 mb-3">
              <Zap className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Fast Delivery</h3>
            <p className="text-sm text-zinc-400">We build in days, not weeks</p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 mb-3">
              <Rocket className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">24/7 Support</h3>
            <p className="text-sm text-zinc-400">Ongoing maintenance included</p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 mb-3">
              <Globe className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Scalable</h3>
            <p className="text-sm text-zinc-400">Grows with your business</p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 mb-3">
              <Code className="h-6 w-6 text-orange-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Affordable</h3>
            <p className="text-sm text-zinc-400">Competitive pricing</p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-white mb-4">Ready to transform your business?</h2>
        <p className="text-zinc-400 mb-6">Let's discuss your AI needs</p>
        <a href="mailto:hello@moonlightai.com" className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition-colors">
          <MessageCircle className="h-5 w-5" />
          Contact Us Today
        </a>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-zinc-500 py-6 border-t border-zinc-800">
        <p>Powered by OpenClaw - Autonomous AI Assistant Framework</p>
        <p className="mt-2">© 2026 MoonlightAI Solutions. All rights reserved.</p>
      </div>
    </div>
  );
}
