import { test, expect } from '@playwright/test';

test('homepage has title and displays stories', async ({ page }) => {
  await page.route('**/api/top', route => {
    route.fulfill({
      status: 200,
      body: JSON.stringify([
        { id: 1, title: 'Hero Story', url: 'https://example.com/1', score: 1, by: 'a', time: 0, descendants: 1, ogImage: '', ogDescription: 'Hero Description' },
        { id: 2, title: 'Secondary Story 1', url: 'https://example.com/2', score: 2, by: 'b', time: 0, descendants: 2, ogImage: '', ogDescription: '' },
        { id: 3, title: 'Secondary Story 2', url: 'https://example.com/3', score: 3, by: 'c', time: 0, descendants: 3, ogImage: '', ogDescription: '' },
        { id: 4, title: 'Secondary Story 3', url: 'https://example.com/4', score: 4, by: 'd', time: 0, descendants: 4, ogImage: '', ogDescription: '' },
        { id: 5, title: 'List Story 1', url: 'https://example.com/5', score: 5, by: 'e', time: 0, descendants: 5, ogImage: '', ogDescription: '' },
      ]),
    });
  });

  await page.goto('/');

  await expect(page).toHaveTitle(/Top Tech News/);

  await expect(page.getByText('Hero Story')).toBeVisible();
  await expect(page.getByText('Secondary Story 1')).toBeVisible();
  await expect(page.getByText('List Story 1')).toBeVisible();
});