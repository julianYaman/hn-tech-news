import { writable } from 'svelte/store';

function createToastStore() {
	const { subscribe, update } = writable([]);

	function show(message, type = 'info', duration = 3000) {
        const id = Date.now() + Math.random(); // Add random to avoid collision on rapid calls
		update(toasts => {
            const newToasts = [...toasts, { id, message, type }];
            if (newToasts.length > 3) {
                // remove the oldest toast
                return newToasts.slice(1);
            }
			return newToasts;
		});

        setTimeout(() => {
            remove(id);
        }, duration);
	}

	function remove(id) {
		update(toasts => toasts.filter(t => t.id !== id));
	}

	return {
		subscribe,
		show,
	};
}

export const toast = createToastStore();
