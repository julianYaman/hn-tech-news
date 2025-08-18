import { writable, get } from 'svelte/store';
import { bookmarksDB } from '$lib/db';


const createBookmarkStore = () => {
  const { subscribe, set } = writable([]);

  /**
   * Initializes the store by loading all bookmarks from IndexedDB.
   * This should be called once when the application starts.
   */
  async function init() {
    if (typeof window !== 'undefined') {
      const bookmarks = await bookmarksDB.getAll();
      set(bookmarks);
    }
  }

  /**
   * Toggles a bookmark's state.
   * It checks if the story is already bookmarked and either adds or removes it.
   * @param {object} story - The story object to bookmark/unbookmark.
   */
  async function toggle(story) {
    const currentBookmarks = get({ subscribe });
    const isBookmarked = currentBookmarks.some(b => b.id === story.id);

    if (isBookmarked) {
      await bookmarksDB.delete(story.id);
      set(currentBookmarks.filter(b => b.id !== story.id));
    } else {
      const newBookmark = {
        id: story.id,
        title: story.title,
        ogImage: story.ogImage,
        url: story.url,
        savedAt: new Date().toISOString(),
        postedAt: story.time ? new Date(story.time * 1000).toISOString() : ''
      };
      await bookmarksDB.put(newBookmark);
      set([...currentBookmarks, newBookmark]);
    }
  }

  async function remove(id) {
    const currentBookmarks = get({ subscribe });
    const exists = currentBookmarks.some(b => b.id === id);
    if (!exists) return;
    await bookmarksDB.delete(id);
    set(currentBookmarks.filter(b => b.id !== id));
  }

  async function add(story) {
    const currentBookmarks = get({ subscribe });
    if (currentBookmarks.some(b => b.id === story.id)) return;
    const newBookmark = {
      id: story.id,
      title: story.title,
      ogImage: story.ogImage,
      url: story.url,
      savedAt: new Date().toISOString(),
      postedAt: story.time ? new Date(story.time * 1000).toISOString() : ''
    };
    await bookmarksDB.put(newBookmark);
    set([...currentBookmarks, newBookmark]);
  }

  function isBookmarked(id) {
    const currentBookmarks = get({ subscribe });
    return currentBookmarks.some(b => b.id === id);
  }

  return {
    subscribe,
    init,
  toggle,
  add,
  remove,
  isBookmarked,
  };
};

export const bookmarks = createBookmarkStore();

// Named helper to match existing component imports
export const toggleBookmark = (story) => bookmarks.toggle(story);
