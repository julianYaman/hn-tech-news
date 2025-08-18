<script>
  import { generatePlaceholder, getDomain, timeAgo } from '$lib/utils.js';
  import { bookmarks, toggleBookmark } from '$lib/stores/bookmarks.js';
  export let story;

  $: imageUrl = story.ogImage || generatePlaceholder(story.title, 400, 225); // 16:9 aspect ratio
  $: domain = getDomain(story.url);
</script>

<div class="block bg-[var(--color-background-card)] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
  <a href={story.url} target="_blank" rel="noopener noreferrer" class="block group flex-grow">
    <div class="aspect-video overflow-hidden">
      <img src={imageUrl} alt={story.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out">
    </div>
    <div class="p-5">
  <h3 class="text-xl font-bold text-[var(--color-primary-text)] mb-1 group-hover:text-[var(--color-primary-accent)] transition-colors">{story.title}</h3>
      {#if domain}
          <p class="text-sm text-[var(--color-secondary-text)] mb-2">{domain}</p>
      {/if}
      {#if story.ogDescription}
        <p class="text-sm text-[var(--color-secondary-text)] mb-4 line-clamp-3">{story.ogDescription}</p>
      {/if}
    </div>
  </a>
  <div class="p-5 pt-0 mt-auto">
    <div class="text-xs text-[var(--color-secondary-text)] pt-4 border-t border-[var(--color-border)] flex items-center space-x-2">
      <span class="font-semibold">{story.score} points</span>
      <span class="text-gray-400 mx-1">•</span>
  <a href={`https://news.ycombinator.com/item?id=${story.id}`} target="_blank" rel="noopener noreferrer" class="hover:text-[var(--color-primary-accent)] transition-colors flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span>{story.descendants}</span>
      </a>
      {#if story.time}
        <span class="text-gray-400 mx-1">•</span>
        <span>{timeAgo(story.time)}</span>
      {/if}
  <button
    on:click|stopPropagation={() => toggleBookmark({ ...story, ogImage: imageUrl })}
    class="ml-auto text-[var(--color-secondary-text)] hover:text-[var(--color-primary-accent)] transition-colors"
  >
  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="{$bookmarks.some(b => b.id === story.id) ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    </div>
  </div>
</div>