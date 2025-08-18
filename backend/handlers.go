package main

import (
	"encoding/json"
	"net/http"
)

func topStoriesHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*") // Allow all origins
	w.Header().Set("Content-Type", "application/json")
	stories := storyCache.GetAll()
	json.NewEncoder(w).Encode(stories)
}
