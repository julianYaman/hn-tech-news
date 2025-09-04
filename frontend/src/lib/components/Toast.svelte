<script>
  import { toast } from '$lib/stores/toast';
  import { fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  let toasts;
  toast.subscribe(value => {
    toasts = value;
  });

  const typeClasses = {
    info: 'bg-secondary-accent',
    success: 'bg-primary-accent',
    warning: 'bg-highlight-cta',
    error: 'bg-red-500',
  };
</script>

<div class="fixed bottom-5 right-5 flex flex-col space-y-2 z-50">
    {#each toasts as t (t.id)}
        <div
            in:fly={{ x: 100, duration: 300 }}
            out:fly={{ x: 100, duration: 300 }}
            animate:flip={{ duration: 300 }}
            class="py-3 px-5 rounded-lg text-white font-semibold shadow-lg {typeClasses[t.type] || 'bg-secondary-accent'}"
            role="alert"
        >
            {t.message}
        </div>
    {/each}
</div>

<style>
    .bg-primary-accent {
        background-color: var(--color-primary-accent);
    }
    .bg-secondary-accent {
        background-color: var(--color-secondary-accent);
    }
    .bg-highlight-cta {
        background-color: var(--color-highlight-cta);
        color: var(--color-primary-text);
    }
</style>
