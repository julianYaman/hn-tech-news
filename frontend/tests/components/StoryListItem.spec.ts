import { render, screen } from '@testing-library/svelte';
import StoryListItem from '../../src/lib/components/StoryListItem.svelte';
import { describe, it, expect } from 'vitest';

describe('StoryListItem', () => {
  it('renders story information', () => {
    const story = {
      title: 'Test Story',
      score: 100,
      by: 'tester',
      descendants: 50,
      url: 'https://example.com',
    };

    render(StoryListItem, { story });

    expect(screen.getByText('Test Story')).toBeInTheDocument();
    expect(screen.getByText('100 points by tester | 50 comments')).toBeInTheDocument();
    expect(screen.getByText('Read more')).toHaveAttribute('href', 'https://example.com');
  });
});