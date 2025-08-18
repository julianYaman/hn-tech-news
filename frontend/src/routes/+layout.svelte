<script>
  import "../app.css";
  import { onMount } from 'svelte';
  import { bookmarks } from '$lib/stores/bookmarks';
  import { theme } from '$lib/stores/theme.js';

  onMount(() => {
    bookmarks.init();
    theme.init();
  });
</script>

<slot />