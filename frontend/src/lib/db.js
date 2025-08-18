import { openDB } from 'idb';

// Lazily create DB only when running in a browser.
let dbPromise = null;
let inMemoryStore = null;

function hasIndexedDB() {
  // Use typeof check to avoid ReferenceError during SSR.
  return typeof indexedDB !== 'undefined';
}

function getDbPromise() {
  if (dbPromise) return dbPromise;

  if (!hasIndexedDB()) {
    // Provide a lightweight in-memory fallback for server-side imports.
    inMemoryStore = new Map();
    dbPromise = Promise.resolve({
      async get(_store, key) {
        return inMemoryStore.has(key) ? inMemoryStore.get(key) : undefined;
      },
      async getAll(_store) {
        return Array.from(inMemoryStore.values());
      },
      async put(_store, val) {
        inMemoryStore.set(val.id, val);
        return val;
      },
      async delete(_store, key) {
        return inMemoryStore.delete(key);
      },
    });
    return dbPromise;
  }

  dbPromise = openDB('hn-news-db', 1, {
    upgrade(db) {
      // Create an 'object store' for bookmarks.
      // The 'id' property will be the key.
      if (!db.objectStoreNames.contains('bookmarks')) {
        db.createObjectStore('bookmarks', { keyPath: 'id' });
      }
    },
  });

  return dbPromise;
}

export const bookmarksDB = {
  async get(key) {
    const db = await getDbPromise();
    return db.get('bookmarks', key);
  },
  async getAll() {
    const db = await getDbPromise();
    return db.getAll('bookmarks');
  },
  async put(val) {
    const db = await getDbPromise();
    return db.put('bookmarks', val);
  },
  async delete(key) {
    const db = await getDbPromise();
    return db.delete('bookmarks', key);
  },
};