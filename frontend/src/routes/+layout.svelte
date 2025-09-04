<script>
  import "../app.css";
  import { onMount } from 'svelte';
  import { bookmarks } from '$lib/stores/bookmarks';
  import { theme } from '$lib/stores/theme.js';
  import Toast from '$lib/components/Toast.svelte';

  onMount(() => {
    bookmarks.init();
    theme.init();
  });
</script>

<Toast />
<slot />