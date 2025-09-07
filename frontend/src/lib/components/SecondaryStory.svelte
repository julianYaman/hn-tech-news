<script>
  import { generatePlaceholder, getDomain, timeAgo } from '$lib/utils.js';
  import { bookmarks, toggleBookmark } from '$lib/stores/bookmarks.js';
  import { getSummary } from '$lib/api.js';
  export let story;

  $: imageUrl = story.ogImage || generatePlaceholder(story.title, 100, 100);
  $: domain = getDomain(story.url);

  let summary = null;
  let isSummaryVisible = false;
  let isLoadingSummary = false;
  let error = null;

  async function handleSummaryToggle() {
    if (summary || error) {
      isSummaryVisible = !isSummaryVisible;
      return;
    }
    isLoadingSummary = true;
    error = null;
    try {
      const result = await getSummary(story.id);
      summary = result.summary;
      isSummaryVisible = true;
    } catch (e) {
      error = e.message;
      isSummaryVisible = true;
    } finally {
      isLoadingSummary = false;
    }
  }
</script>

<div class="p-4 rounded-lg hover:bg-[var(--color-background-dark-sections)] transition-colors">
  <a href={story.url} target="_blank" rel="noopener noreferrer" class="group flex items-center space-x-4">
    <div class="flex-shrink-0">
      <img src={imageUrl} alt={story.title} class="w-16 h-16 rounded-md object-cover">
    </div>
    <div class="flex-grow">
  <h3 class="text-lg font-bold text-[var(--color-primary-text)] group-hover:text-[var(--color-primary-accent)] transition-colors mb-1">{story.title}</h3>
      {#if domain}
          <p class="text-sm text-[var(--color-secondary-text)]">{domain}</p>
      {/if}
    </div>
  </a>

  <!-- Summary Section -->
  <div class="pl-20 mt-2">
      {#if isSummaryVisible && summary}
        <div class="text-sm p-2 bg-[var(--color-background-card)] rounded-md border-l-2 border-[var(--color-secondary-accent)]">
          <p class="font-semibold text-md mb-1">TL;DR</p>
          <p class="text-[var(--color-secondary-text)] whitespace-pre-line">{summary}</p>
        </div>
      {:else if isLoadingSummary}
        <div class="text-sm p-2 bg-[var(--color-background-card)] rounded-md animate-pulse">Loading...</div>
      {:else if isSummaryVisible && error}
        <div class="text-sm p-2 bg-red-100 text-red-700 rounded-md">{error}</div>
      {/if}
  </div>

  <div class="text-sm text-[var(--color-secondary-text)] mt-2 flex items-center space-x-2 pl-20">
    <span class="font-semibold">{story.score} points</span>
    <span class="text-gray-400">•</span>
  <a href={`https://news.ycombinator.com/item?id=${story.id}`} target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-primary-accent)] transition-colors flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
      <span>{story.descendants}</span>
    </a>
    {#if story.time}
      <span class="text-gray-400">•</span>
      <span>{timeAgo(story.time)}</span>
    {/if}

    <!-- Button Group -->
    <div class="ml-auto flex items-center space-x-2">
      {#if !isLoadingSummary}
        <button on:click|stopPropagation={handleSummaryToggle} title={isSummaryVisible ? 'Hide Summary' : 'Generate AI Summary'} class="flex items-center justify-center h-8 w-8 rounded-full text-white transition-transform hover:scale-105" style="background-color: var({isSummaryVisible ? '--color-secondary-text' : '--color-secondary-accent'});">
          <span>{isSummaryVisible ? '🙈' : '💡'}</span>
        </button>
      {/if}

      <button on:click|stopPropagation={() => toggleBookmark({...story, ogImage: imageUrl})} class="text-[var(--color-secondary-text)] hover:text-[var(--color-primary-accent)] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="{$bookmarks.some(b => b.id === story.id) ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    </div>
  </div>
</div>
