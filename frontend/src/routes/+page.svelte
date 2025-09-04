<script>
  import Header from '../lib/components/Header.svelte';
  import Footer from '../lib/components/Footer.svelte';
  import HeroStory from '../lib/components/HeroStory.svelte';
  import SecondaryStory from '../lib/components/SecondaryStory.svelte';
  import StoryListItem from '../lib/components/StoryListItem.svelte';
  export let data;

  $: heroStory = data.stories?.[0];
  $: secondaryStories = data.stories?.slice(1, 5);
  $: remainingStories = data.stories?.slice(5);
</script>

<div class="min-h-screen flex flex-col">
  <Header />

  <main class="container mx-auto p-4 flex-grow">
    {#if data.stories && data.stories.length > 0}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12 items-start">
        <div class="lg:col-span-2">
          <HeroStory story={heroStory} />
        </div>
        <div class="bg-[var(--color-background-dark-sections)] p-6 rounded-lg">
          <h2 class="text-2xl font-bold mb-5 text-[var(--color-primary-text)] border-b-4 border-[var(--color-primary-accent)] pb-3">More Top Stories</h2>
          <div class="space-y-5">
            {#each secondaryStories as story}
              <SecondaryStory {story} />
            {/each}
          </div>
        </div>
      </div>
      
      <div>
        <h2 class="text-3xl font-bold mb-6 text-[var(--color-primary-text)] border-b-4 border-[var(--color-secondary-accent)] pb-3">All Stories</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
          {#each remainingStories as story}
            <StoryListItem {story} />
          {/each}
        </div>
      </div>
    {:else}
      <div class="flex justify-center items-center h-96">
        <p class="text-2xl text-[var(--color-secondary-text)]">Loading stories...</p>
      </div>
    {/if}
  </main>

  <Footer />
</div>