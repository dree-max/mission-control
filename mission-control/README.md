# Mission Control 🦉

A Next.js dashboard for managing your MoonlightAI agent squad.

![Mission Control Dashboard](https://via.placeholder.com/800x400?text=Mission+Control)

## Features

| Component | Description |
|-----------|-------------|
| **Tasks Board** | Kanban for tracking all tasks |
| **Content Pipeline** | YouTube & Blog content workflows |
| **Calendar** | Scheduled tasks and cron jobs |
| **Memory** | Searchable log of all memories |
| **Team** | Agent roster with live status |
| **LinkedIn** | Post to your company page |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Data:** Local JSON + LinkedIn API

## Quick Start (Local)

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### 1. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/moonlightai-mission-control.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Add environment variables:

| Variable | Value |
|----------|-------|
| `LINKEDIN_ACCESS_TOKEN` | Your LinkedIn access token |
| `LINKEDIN_COMPANY_ID` | 110355782 |

4. Deploy!

## Project Structure

```
mission-control/
├── app/
│   ├── page.tsx           # Dashboard home
│   ├── tasks/             # Tasks Board
│   ├── pipeline/          # Content Pipeline
│   ├── calendar/          # Calendar
│   ├── memory/            # Memory
│   ├── team/              # Team
│   ├── linkedin/          # LinkedIn Posting
│   └── api/
│       └── openclaw/      # API routes
├── components/
│   └── Navbar.tsx
├── data/                  # JSON data files
├── .env.local            # Local env vars
└── package.json
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `LINKEDIN_ACCESS_TOKEN` | Yes | LinkedIn OAuth token |
| `LINKEDIN_COMPANY_ID` | No | Default: 110355782 |

## License

MIT
