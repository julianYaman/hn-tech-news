import { getTopStories } from '../lib/api.js';
import { PRIVATE_API_BASE_URL } from '$env/static/private';

export async function load({ fetch, setHeaders }) {
  const stories = await getTopStories(fetch, PRIVATE_API_BASE_URL);

  // Cache the page for 5 minutes (300 seconds).
  // This is a good value, as the backend cache refreshes every 15 minutes.
  setHeaders({
    'Cache-Control': 'public, max-age=300',
  });

  return {
    stories,
  };
}