// API route to fetch real OpenClaw & LinkedIn data

import { NextResponse } from 'next/server'

// LinkedIn Access Token from environment
const LINKEDIN_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN
const COMPANY_ID = process.env.LINKEDIN_COMPANY_ID || '110355782'

async function fetchLinkedInData(endpoint: string) {
  if (!LINKEDIN_TOKEN) {
    return { error: 'No LinkedIn token configured' }
  }
  
  try {
    const response = await fetch(`https://api.linkedin.com/v2/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${LINKEDIN_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      }
    })
    return await response.json()
  } catch (error) {
    console.error('LinkedIn API error:', error)
    return { error: 'Failed to fetch from LinkedIn' }
  }
}

export async function GET() {
  try {
    // Fetch LinkedIn company page data
    const companyData = await fetchLinkedInData(`organizations/${COMPANY_ID}`)
    
    // Fetch company posts (if company data worked)
    let postsData = null
    if (!companyData.error) {
      postsData = await fetchLinkedInData(`organizations/${COMPANY_ID}/posts?count=10`)
    }

    // Build response
    const data = {
      timestamp: new Date().toISOString(),
      linkedIn: {
        connected: !companyData.error,
        companyId: COMPANY_ID,
        companyName: companyData?.name || 'MoonlightAI Solutions',
        companyTagline: companyData?.tagline || '',
        companyDescription: companyData?.description || '',
        followerCount: companyData?.followeeCount || 0,
        posts: postsData?.elements || [],
        postCount: postsData?.paging?.total || 0,
        error: companyData.error || null
      },
      agents: [
        { id: 'kagu', name: 'Kagu', role: 'Squad Lead', status: 'working', emoji: '🦉' },
        { id: 'jarvis', name: 'Jarvis', role: 'Coordination', status: 'idle', emoji: '🤖' },
        { id: 'fury', name: 'Fury', role: 'Research', status: 'idle', emoji: '🔥' },
        { id: 'loki', name: 'Loki', role: 'Content', status: 'idle', emoji: '✍️' },
        { id: 'vision', name: 'Vision', role: 'SEO', status: 'idle', emoji: '👁️' },
        { id: 'quill', name: 'Quill', role: 'Social', status: 'idle', emoji: '🖊️' }
      ],
      cronJobs: [
        { id: 'jarvis', agent: 'Jarvis', time: '08:00', status: 'scheduled' },
        { id: 'fury', agent: 'Fury', time: '09:00', status: 'scheduled' },
        { id: 'loki', agent: 'Loki', time: '10:00', status: 'scheduled' },
        { id: 'vision', agent: 'Vision', time: '11:00', status: 'scheduled' },
        { id: 'quill', agent: 'Quill', time: '12:00', status: 'scheduled' }
      ]
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
