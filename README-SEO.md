# Assay website: launch & SEO checklist

## 1. Before you upload
- Domain is set to https://assayfinance.com (apex). In your host, redirect www.assayfinance.com to https://assayfinance.com so Google sees one address.
- Contact email on the site is founders@assayfinance.com. Create that inbox (Google Workspace, Zoho or forwarding from your registrar), or tell us a different address.
- Upload every file in this folder to the root of the domain (Vercel, Netlify, Cloudflare Pages all work: drag and drop).

## 2. Get indexed (day 1)
- Google Search Console: add the domain, verify via DNS, submit `sitemap.xml`, request indexing for the homepage.
- Bing Webmaster Tools: import from Search Console. (ChatGPT search and Copilot lean on Bing's index.)
- Check the share card at opengraph.xyz and LinkedIn Post Inspector.

## 3. Keywords to own (realistic targets)
"Assay" alone is a common lab/science word, so ranking #1 for it is unrealistic early. Own the brand + category instead:
- Brand: "Assay AI agent payments", "Assay agent permissions", "Assay bank AI agents"
- Category: "AI agent payments for banks", "bank AI agent access", "agent payment permissions", "AI agent mandate", "agentic payments business banking", "credit union AI agents", "UCC 4A AI agent", "know your agent banking"

## 4. What actually moves rankings (and AI answers)
- Backlinks and mentions: YC/Speedrun profile, LinkedIn company page, Crunchbase, Product Hunt, GitHub (open-source the mandate/evidence format), Hacker News launch post.
- One useful article per week on the category, e.g. "How UCC 4A applies to AI agent payments", "Why banks blocked AI agents in October 2026", "What a mandate for an AI agent should contain". These are what AI answer engines quote.
- Keep `llms.txt` and the FAQ accurate. AI engines reward clear, factual, consistent descriptions repeated across your site, LinkedIn and directories.

## Files in this folder
index.html · favicon.ico · favicon.svg · apple-touch-icon.png · icon-192.png · icon-512.png · og-image.png (social share card) · site.webmanifest · robots.txt (allows Google, Bing and AI crawlers) · sitemap.xml · llms.txt (summary for AI assistants) · assay-mark-dark.svg / assay-mark-light.svg (logo)

## Guides (/learn/) — your ranking engine
Five search-targeted guides plus a hub are live in /learn/, each with its own title, description, canonical, Article/FAQ schema and links back to the homepage:

| Page | Main searches it targets |
|---|---|
| /learn/ai-agent-payments-for-banks.html | AI agent payments for banks, credit union AI agents |
| /learn/why-banks-blocked-ai-agents.html | banks block AI agents, JPMorgan / Bank of America AI agents |
| /learn/ucc-4a-ai-agent-payments.html | UCC 4A AI agent, commercially reasonable security procedure |
| /learn/ai-agent-payment-mandate.html | AI agent mandate, agent spending limits |
| /learn/know-your-agent-vs-mandates.html | know your agent, KYA vs authorization |

Keep going: publish one new guide every week (ideas: Regulation E and AI agents, AI agents for treasury teams, agent payments for credit unions, MCP for banks, AP2 vs PAP explained). Add each to sitemap.xml and llms.txt (or rerun gen_learn.py). Share every guide on LinkedIn and relevant communities. Links from other sites are what move rankings most.
