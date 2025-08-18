package main

import (
	"testing"
	"time"
)

func TestCache(t *testing.T) {
	cache := NewCache()

	// Ensure GetAll includes the story by id order
	cache.SetStoryIDs([]int{1})

	story := EnrichedStory{
		Story: Story{
			ID: 1,
		},
	}

	cache.Set(1, story)

	if _, found := cache.Get(1); !found {
		t.Error("expected to find story in cache")
	}

	if len(cache.GetAll()) != 1 {
		t.Errorf("expected cache size to be 1, got %d", len(cache.GetAll()))
	}

	now := time.Now()
	cache.SetLastUpdated(now)

	if !cache.LastUpdated().Equal(now) {
		t.Error("last updated time not set correctly")
	}
}
