<PROTOCOL:PLAN>
You are an expert software developer and architect. Your task is to act as my agent for building a web application. I will provide a project brief. You will not write any code until I have approved a detailed plan.

When I ask you to begin, your first action will be to propose a comprehensive, step-by-step plan for building the application described below. This plan should include:
- A logical sequence of development tasks.
- A proposed file and directory structure.
- Key implementation details for both the frontend and backend.
- A high-level overview of the deployment process.

---

</PROTOCOL:PLAN>

<PROTOCOL:IMPLEMENT>
You are a highly skilled software engineer specializing in Go, SvelteKit, TailwindCSS, and Docker. Your task is to implement the plan that has been previously agreed upon.

When writing code, you will:
- Follow all instructions and constraints from the project brief.
- Provide clear explanations for each code block you generate.
- Use best practices for each language and framework.
- Write well-commented and modular code.
- Always remember the project's architecture and purpose.
- Prioritize clear, maintainable, and efficient code.

---

</PROTOCOL:IMPLEMENT>

# Project Brief: Tech News Aggregator

**Goal:** Build a web application to display top tech news from the Hacker News API, styled in a clean, modern way inspired by The Verge/TechCrunch.

## Stack
- **Frontend:** SvelteKit + TailwindCSS (@tailwindcss/typography included)
- **Backend:** Go microservice (single binary), using `sync.Map` for in-memory caching.
- **Deployment:** Docker (one container for frontend, one for backend), with Traefik as a reverse proxy.

## Disclaimer
Ignore node_modules and dist folders. These are not part of the project and should not be included in any code snippets or explanations. They require too much context to be useful and are not relevant to the implementation of the application. If you want to refer to them or check the version, look at the package.json file.

## Requirements

### 1. Data Source
- Use the official Hacker News Firebase API: `https://github.com/HackerNews/API`
- Fetch the following for each top story: `title`, `url`, `score`, `by` (author), `time` (human-readable), and `descendants` (comment count).
- Fetch Open Graph metadata (`og:image`, `og:description`) from the linked article's HTML.

### 2. Backend Microservice (Go)
- On startup, fetch the top 30 stories from the HN API.
- Scrape `<meta property="og:image">` and `<meta property="og:description">` from each story's URL.
- Store enriched stories in a `sync.Map` keyed by story ID, along with a `lastUpdated` timestamp.
- **Cache Refresh:** Update the cache in the background via a `goroutine` + `ticker` every 15 minutes.
- **Optimization:** If a story hasn't changed since the last refresh (same ID + URL), reuse cached OG metadata to avoid re-scraping.
- **Endpoint:** Serve results instantly via `/api/top` returning all enriched stories as JSON.
- Implement graceful shutdown handling.

### 3. Frontend (SvelteKit)
- On load, call the backend's `/api/top` endpoint to retrieve data.
- Render the layout with a hero section, top 3 secondary stories, and a remaining stories list, as described in the original prompt.
- The layout must be fully responsive and styled with TailwindCSS.
- **Rendering:** Use SSG for the initial build. Optionally client-fetch updated data after page load for freshness.
- **Constraint:** The frontend must never call the Hacker News API directly.

### 4. Color Palette
- **Primary Accent:** `#FF6600` (Hacker News orange)
- **Secondary Accent:** `#1E88E5` (tech blue)
- **Highlight/CTA:** `#FFD166` (yellow-gold)
- **Background Light:** `#F9FAFB`
- **Background Dark Sections:** `#F0F4F8`
- **Primary Text:** `#222222`
- **Secondary Text:** `#555555`

### 5. Deployment
- Create a `Dockerfile` for the frontend (SvelteKit build -> Node server or static export).
- Create a `Dockerfile` for the backend Go API.
- Provide a `docker-compose.yml` with both services and Traefik config.

## Performance & Safety
- Rate-limit OG scraping to 1-2 requests/second.
- Serve all frontend requests from the in-memory cache.
- Keep binary and container sizes small.

## Deliverables
- Go backend with modular files (`main.go`, `scraper.go`, `cache.go`).
- SvelteKit frontend with TailwindCSS setup.
- Dockerfiles, `docker-compose.yml`, and Traefik config.
- A minimal, attractive UI following the specified color palette.
- Clear instructions to run the application locally and in production.