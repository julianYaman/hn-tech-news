# AI-Powered Summaries Proposal

This document outlines a plan to implement AI-powered summaries for articles on the Tech News Aggregator site.

### 1. Feature Overview

The goal is to add a "Summarize" button to each story card. When a user clicks this button, the application will generate and display a concise, one-sentence summary of the linked article. This provides significant value by helping users quickly grasp the core message of an article before deciding to read it.

### 2. Recommended Model: Gemini 1.5 Flash

For this feature, I recommend using **Google's Gemini 1.5 Flash** model.

- **Why Gemini 1.5 Flash?** It is specifically designed for high-volume, low-cost tasks like summarization. It's extremely fast and efficient, making it perfect for providing near-instant summaries to users without incurring significant costs.

### 3. Alternative Cost-Effective Models

Based on research, here are other excellent, cost-effective models that could be used:

- **Meta's BART:** A powerful open-source model that performs very well on summarization tasks. It would require self-hosting, which adds infrastructure overhead but can be cheaper at very high volumes.
- **Google's T5:** A versatile open-source model that can also be fine-tuned for high-quality summarization.
- **NLP Cloud API:** A service that provides access to various models (including BART) on a pay-as-you-go basis, removing the need for self-hosting.
- **OpenAI's GPT Models:** While extremely powerful, they might be less cost-effective for simple, high-volume summarization compared to a specialized model like Gemini 1.5 Flash.

### 4. Implementation Plan

This feature will be implemented in three parts:

#### a. Backend Changes

1.  **Create a New API Endpoint:** I will add a new endpoint to the Go backend, such as `/api/summarize`. This endpoint will accept a URL as a query parameter.
2.  **Scrape Article Content:** Upon receiving a request, the backend will first scrape the full text content from the provided URL.
3.  **Call AI API:** The scraped text will be sent to the chosen AI API (e.g., Gemini) with a prompt like: `"Summarize the following article in a single, concise sentence: [article text]"`.
4.  **Cache the Summary:** To prevent redundant API calls and reduce costs, the generated summary will be stored in our existing cache, associated with the story ID.

#### b. Frontend Changes

1.  **Add a "Summarize" Button:** A new button with a "sparkle" icon will be added to each of the three story card components (`HeroStory.svelte`, `SecondaryStory.svelte`, and `StoryListItem.svelte`).
2.  **API Call:** When the button is clicked, the frontend will call our new `/api/summarize` endpoint.
3.  **Display the Summary:** A new area on the card will be revealed to display the summary. This could be an expansion of the card or a small, elegant pop-up. The button will enter a loading state while the summary is being generated.

#### c. User Experience

- The summarization process will be asynchronous. The user can continue to browse the page while a summary is being generated.
- Once a summary is generated and cached, it will be displayed instantly for any user who requests it for the same article.
