# Tech News Aggregator

This project is a modern, high-performance tech news aggregator inspired by platforms like The Verge and TechCrunch. It fetches top stories from the Hacker News API, enriches them with Open Graph metadata, and displays them in a clean, responsive interface.

## Features

- **Top 30 Stories:** Displays the current top 30 articles from Hacker News.
- **Metadata Enrichment:** Scrapes `og:image` and `og:description` from each article for a richer preview.
- **High-Performance Backend:** A Go microservice with an in-memory cache (`sync.Map`) serves all data instantly.
- **Background Refresh:** The cache is automatically updated every 15 minutes.
- **Server-Side Rendered Frontend:** A SvelteKit frontend ensures fast page loads.
- **Containerized:** The entire application is designed to run in Docker containers.

## Tech Stack

- **Backend:** Go
- **Frontend:** SvelteKit, TailwindCSS
- **Caching:** In-memory cache in Go (`sync.Map`)

## Architecture

The application consists of two main services:

1.  **Backend (Go):** A single Go binary that acts as an API. It fetches data from Hacker News, scrapes metadata, caches the results, and exposes a single endpoint (`/api/top`).
2.  **Frontend (SvelteKit):** A server-side rendered web application. It calls the backend API on the server to fetch data and renders the HTML before sending it to the client.

```
[Internet] -> [Hacker News API] -> [Backend Go Service] <-> [Frontend SvelteKit Service] <- [User's Browser]
```

## Getting Started

### Prerequisites

- Go (1.18+)
- Node.js (18+)
- Docker & Docker Compose

### Local Development

1.  **Create Environment File:**
    Create a `.env.development` file in the root of the project with the following content:
    ```env
    PRIVATE_API_BASE_URL=http://localhost:8080
    ```

2.  **Run the Development Script:**
    The provided `dev.sh` script will install frontend dependencies and start both the Go backend and SvelteKit frontend servers concurrently.

    ```bash
    ./dev.sh
    ```

3.  **Open The App:**
    Visit `http://localhost:5173` in your browser.

## Configuration

The application uses environment variables for configuration.

-   `PRIVATE_API_BASE_URL`: The URL of the backend API, used by the SvelteKit server.