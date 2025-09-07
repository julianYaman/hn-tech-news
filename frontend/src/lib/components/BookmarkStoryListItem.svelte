<script>
  import { generatePlaceholder, getDomain, timeAgo } from '$lib/utils.js';
  import { bookmarks } from '$lib/stores/bookmarks.js';
  export let bookmark;

  $: imageUrl = bookmark.ogImage || generatePlaceholder(bookmark.title, 400, 225);
  $: domain = getDomain(bookmark.url);

  function remove(e) {
    // prevent parent link navigation
    e?.stopPropagation?.();
    bookmarks.remove(bookmark.id);
  }

  // Show relative (e.g. "3 days ago") for items <= 5 days old; otherwise show local date only.
  function fmt(iso) {
    if (!iso) return 'Unknown';
    const d = new Date(iso);
    const ms = Date.now() - d.getTime();
    const fiveDays = 5 * 24 * 60 * 60 * 1000;
    if (ms >= fiveDays) {
      // local date string without time
      return d.toLocaleDateString();
    }
    // timeAgo expects unix seconds
    return timeAgo(Math.floor(d.getTime() / 1000));
  }
</script>

<div class="block bg-[var(--color-background-card)] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
  <a href={bookmark.url} target="_blank" rel="noopener noreferrer" class="block group flex-grow">
    <div class="aspect-video overflow-hidden hidden md:block">
      <img src={imageUrl} alt={bookmark.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out">
    </div>
    <div class="p-5">
      <h3 class="text-xl font-bold text-[var(--color-primary-text)] mb-1 group-hover:text-[var(--color-primary-accent)] transition-colors">{bookmark.title}</h3>
      {#if domain}
        <p class="text-sm text-[var(--color-secondary-text)] mb-2">{domain}</p>
      {/if}
      {#if bookmark.ogDescription}
        <p class="text-sm text-[var(--color-secondary-text)] mb-4 line-clamp-3">{bookmark.ogDescription}</p>
      {/if}
    </div>
  </a>

  <div class="p-5 pt-0 mt-auto">
    <div class="text-xs text-[var(--color-secondary-text)] pt-4 border-t border-[var(--color-border)] flex items-center space-x-2">
      <div class="flex flex-col">
        <span class="font-semibold">Saved</span>
        <span class="text-[var(--color-secondary-text)]">{fmt(bookmark.savedAt)}</span>
      </div>

      <div class="mx-2">•</div>

      <div class="flex flex-col">
        <span class="font-semibold">Posted</span>
        <span class="text-[var(--color-secondary-text)]">{fmt(bookmark.postedAt)}</span>
      </div>

      <div class="mx-2">•</div>

      <a href={`https://news.ycombinator.com/item?id=${bookmark.id}`} target="_blank" rel="noopener noreferrer" class="text-[var(--color-primary-accent)] hover:underline">
        View on Hacker News
      </a>

      <button
        on:click|stopPropagation={remove}
        aria-label="Remove bookmark"
        title="Remove bookmark"
        class="ml-auto bg-[var(--color-primary-accent)] hover:bg-[var(--color-secondary-accent)] text-white rounded-md px-3 py-1 transition-colors"
      >
        ×
      </button>
    </div>
  </div>
</div>
