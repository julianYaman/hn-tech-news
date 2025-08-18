export async function getTopStories(fetchFn, apiBaseUrl) {
  const res = await fetchFn(`${apiBaseUrl}/api/top`);
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error('Failed to fetch stories');
  }
}