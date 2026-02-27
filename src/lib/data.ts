// Shared data for Mission Control
// This is the single source of truth for all pages

// ===== TASKS =====
export type TaskStatus = "Inbox" | "Assigned" | "In Progress" | "Review" | "Done";
export type Assignee = "Ivan" | "MarvelSquad";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: Assignee;
  status: TaskStatus;
  createdAt: string;
}

export const tasks: Task[] = [
  { id: "1", title: "Build website landing page", description: "Create the main landing page", assignee: "Ivan", status: "Inbox", createdAt: "2026-02-24" },
  { id: "2", title: "Write LinkedIn posts", description: "Draft 3 posts for the week", assignee: "MarvelSquad", status: "In Progress", createdAt: "2026-02-21" },
  { id: "3", title: "Research AI tools", description: "Find new AI tools", assignee: "MarvelSquad", status: "Review", createdAt: "2026-02-20" },
  { id: "4", title: "Setup cron jobs", description: "Automate daily backup", assignee: "Ivan", status: "Done", createdAt: "2026-02-19" },
  { id: "5", title: "Post to LinkedIn", description: "Daily content post", assignee: "MarvelSquad", status: "Inbox", createdAt: "2026-02-27" },
  { id: "6", title: "Update website content", description: "Add new blog posts", assignee: "MarvelSquad", status: "Inbox", createdAt: "2026-02-27" },
  { id: "7", title: "Review content strategy", description: "Weekly review", assignee: "MarvelSquad", status: "Assigned", createdAt: "2026-02-27" },
  { id: "8", title: "Check analytics", description: "Review metrics", assignee: "Ivan", status: "Inbox", createdAt: "2026-02-27" },
  { id: "9", title: "Fix LinkedIn API", description: "Token refresh issue", assignee: "Kagu", status: "In Progress", createdAt: "2026-02-26" },
  { id: "10", title: "Deploy to Vercel", description: "Push latest build", assignee: "Kagu", status: "Done", createdAt: "2026-02-25" },
  { id: "11", title: "Team standup", description: "Daily sync", assignee: "Ivan", status: "Done", createdAt: "2026-02-24" },
  { id: "12", title: "Content approval", description: "Review MarvelSquad posts", assignee: "Ivan", status: "Review", createdAt: "2026-02-27" },
];

// ===== CONTENT / PIPELINE =====
export type ContentStage = "Ideas" | "Script" | "Thumbnail" | "Filming" | "Published";
export type ContentStatus = "draft" | "pending" | "posted";

export interface ContentItem {
  id: string;
  title: string;
  notes: string;
  script: string;
  images: string[];
  stage: ContentStage;
  status: ContentStatus;
  platform?: string;
  createdAt: string;
}

export const contentItems: ContentItem[] = [
  { id: "1", title: "AI Tools Review 2026", notes: "Top 10 AI tools for creators", script: "", images: [], stage: "Ideas", status: "draft", createdAt: "2026-02-24" },
  { id: "2", title: "How to use OpenClaw", notes: "Tutorial for beginners", script: "Welcome to this tutorial...", images: [], stage: "Script", status: "draft", createdAt: "2026-02-23" },
  { id: "3", title: "Productivity Tips", notes: "5 tips for remote work", script: "", images: ["thumb1.png"], stage: "Thumbnail", status: "pending", createdAt: "2026-02-22" },
  { id: "4", title: "5 Ways AI is Transforming Small Business", notes: "Blog post for website", script: "", images: [], stage: "Published", status: "posted", platform: "LinkedIn", createdAt: "2026-02-21" },
  { id: "5", title: "AI Implementation Guide", notes: "Comprehensive guide", script: "", images: [], stage: "Ideas", status: "draft", createdAt: "2026-02-27" },
  { id: "6", title: "Future of AI in Business", notes: "Thought leadership piece", script: "", images: [], stage: "Script", status: "draft", createdAt: "2026-02-26" },
  { id: "7", title: "Case Study: Startup AI", notes: "Client success story", script: "", images: [], stage: "Ideas", status: "draft", createdAt: "2026-02-25" },
  { id: "8", title: "Weekly AI News", notes: "Curated news roundup", script: "", images: [], stage: "Published", status: "posted", platform: "LinkedIn", createdAt: "2026-02-20" },
];

// ===== SOCIAL POSTS =====
export interface Post {
  id: string;
  title: string;
  text: string;
  status: ContentStatus;
  createdAt: string;
  platform?: string;
}

export const posts: Post[] = [
  {
    id: "1",
    title: "5 Ways AI is Transforming Small Business Operations in 2026",
    text: "5 Ways AI is Transforming Small Business Operations in 2026: 1) Automated customer support 2) Predictive analytics 3) Smart inventory management 4) Personalized marketing 5) Streamlined HR processes.",
    status: "posted",
    createdAt: "2026-02-24T00:35:00Z",
    platform: "LinkedIn"
  },
  {
    id: "2", 
    title: "Productivity Tips",
    text: "5 Productivity Tips That Changed My Workflow: 1. Use AI to automate repetitive tasks 2. Set up cron jobs for routine work 3. Build a personal command center",
    status: "posted",
    createdAt: "2026-02-21T08:00:00Z",
    platform: "LinkedIn"
  },
  {
    id: "3",
    title: "AI Tools Discovery", 
    text: "Just discovered some amazing AI tools for content creators!",
    status: "pending",
    createdAt: "2026-02-21T07:00:00Z",
    platform: "LinkedIn"
  }
];

// ===== TEAM =====
export type AgentCategory = "lead" | "content" | "developer" | "designer" | "researcher";
export type AgentStatus = "active" | "idle" | "offline";

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  bot?: string;
  category: AgentCategory;
  description: string;
}

export const agents: Agent[] = [
  { id: "kagu", name: "Kagu", role: "Squad Lead", status: "active", bot: "@UncledrisBot", category: "lead", description: "Main agent - coordinates the team" },
  { id: "jarvis", name: "Jarvis", role: "Content Manager", status: "active", bot: "@MarvelSquad_bot", category: "content", description: "Manages content creation" },
  { id: "fury", name: "Fury", role: "Strategic Lead", status: "idle", bot: "@MarvelSquad_bot", category: "content", description: "Strategic planning" },
  { id: "loki", name: "Loki", role: "Content Writer", status: "active", bot: "@MarvelSquad_bot", category: "content", description: "Writes scripts and content" },
  { id: "vision", name: "Vision", role: "Researcher", status: "idle", bot: "@MarvelSquad_bot", category: "researcher", description: "Research and data analysis" },
  { id: "quill", name: "Quill", role: "Heartbeat Agent", status: "active", bot: "@MarvelSquad_bot", category: "content", description: "Monitors tasks" },
];

// ===== STATS =====
export const stats = {
  totalTasks: tasks.length,
  tasksInProgress: tasks.filter(t => t.status === "In Progress").length,
  tasksDone: tasks.filter(t => t.status === "Done").length,
  totalContent: contentItems.length,
  contentPublished: contentItems.filter(c => c.status === "posted").length,
  contentDraft: contentItems.filter(c => c.status === "draft").length,
  totalPosts: posts.length,
  postsPublished: posts.filter(p => p.status === "posted").length,
  postsPending: posts.filter(p => p.status === "pending").length,
  activeAgents: agents.filter(a => a.status === "active").length,
};

// ===== CONTENT STRATEGY =====
export const contentPillars = [
  "AI Education & Thought Leadership",
  "Case Studies & Success Stories", 
  "Product & Technical Content",
  "Industry-Specific Solutions",
  "How-To & Implementation Guides"
];

export const seoKeywords = {
  high: ["AI solutions for business", "enterprise AI implementation", "AI consulting services"],
  medium: ["AI for small business", "machine learning consulting", "AI strategy consulting"]
};
