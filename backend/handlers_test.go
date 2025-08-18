package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestTopStoriesHandler(t *testing.T) {
	storyCache = NewCache()
	storyCache.Set(1, EnrichedStory{
		Story: Story{
			ID:    1,
			Title: "Test Story",
		},
	})

	req, err := http.NewRequest("GET", "/api/top", nil)
	if err != nil {
		t.Fatal(err)
	}

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(topStoriesHandler)

	handler.ServeHTTP(rr, req)

	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	expected := `[{"id":1,"title":"Test Story","url":"https://news.ycombinator.com/item?id=1","score":0,"by":"","time":0,"descendants":0,"ogImage":"","ogDescription":""}]`
	if rr.Body.String() != expected+"\n" {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}
