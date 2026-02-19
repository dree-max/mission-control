import { NextResponse } from "next/server";

const NOTION_TOKEN = process.env.NOTION_TOKEN || "your_notion_token_here";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Search for all pages in the workspace
    const searchResponse = await fetch(
      "https://api.notion.com/v1/search",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          "Notion-Version": "2025-09-03",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: { property: "object", value: "page" },
          page_size: 100
        }),
      }
    );

    const searchData = await searchResponse.json();
    
    if (searchData.error) {
      return NextResponse.json({ error: searchData.message }, { status: 500 });
    }

    const allResults = searchData.results || [];
    console.log("Total Notion items:", allResults.length);

    const agents: any[] = [];
    const tasks: any[] = [];
    const documents: any[] = [];
    const activities: any[] = [];

    for (const page of allResults) {
      // Skip if no properties
      if (!page.properties) continue;
      
      const p = page.properties;
      const type = p.Type?.select?.name || p.Type?.name || 'Unknown';
      
      const nameObj = p.Name?.title?.[0];
      const name = nameObj?.plain_text || nameObj?.text?.content || 'Untitled';
      
      const status = p.Status?.select?.name || p.Status?.name || '';
      const role = p.Role?.select?.name || p.Role?.name || '';
      const sessionKey = p.SessionKey?.rich_text?.[0]?.plain_text || '';
      const description = p.Description?.rich_text?.[0]?.plain_text || '';

      const item = { id: page.id, name, status, role, sessionKey, description, type };

      if (type === 'Agent') {
        agents.push(item);
      } else if (type === 'Task') {
        tasks.push(item);
      } else if (type === 'Document') {
        documents.push(item);
      } else if (type === 'Activity') {
        activities.push(item);
      }
    }

    return NextResponse.json({ agents, tasks, documents, activities, debug: { total: allResults.length } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
