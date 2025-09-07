<script>
  import Header from '../../lib/components/Header.svelte';
  import Footer from '../../lib/components/Footer.svelte';
  import BookmarkStoryListItem from '../../lib/components/BookmarkStoryListItem.svelte';
  import { bookmarks } from '$lib/stores/bookmarks.js';

  let bookmarkedStories = [];
  $: bookmarks.subscribe(bm => {
    bookmarkedStories = bm;
  });

  function removeBookmark(id) {
    bookmarks.remove(id);
  }
</script>

<div class="min-h-screen flex flex-col">
  <Header />

  <main class="max-w-7xl mx-auto p-4 flex-grow">
    <h1 class="text-3xl font-bold mb-6 text-[var(--color-primary-text)] border-b-4 border-[var(--color-secondary-accent)] pb-3">Your Bookmarks</h1>

    <div class="bg-[var(--color-background-dark-sections)] border-l-4 border-[var(--color-secondary-accent)] text-[var(--color-secondary-text)] p-4 rounded-md my-6" role="alert">
      <p class="font-bold">Disclaimer</p>
      <p>Your bookmarks are saved locally in your browser. Clearing your browser's cache or using incognito mode may cause them to be lost.</p>
    </div>

    {#if bookmarkedStories.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
        {#each bookmarkedStories as bookmark (bookmark.id)}
          <BookmarkStoryListItem bookmark={bookmark} />
        {/each}
      </div>
    {:else}
      <div class="flex justify-center items-center h-96">
        <p class="text-xl text-[var(--color-secondary-text)]">You haven't bookmarked any stories yet.</p>
      </div>
    {/if}
  </main>

  <Footer />
</div>
