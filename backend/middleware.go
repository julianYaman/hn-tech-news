package main

import (
	"net/http"
	"sync"
	"time"

	"golang.org/x/time/rate"
)

// Create a map to store rate limiters for each visitor
var visitors = make(map[string]*rate.Limiter)
var mu sync.Mutex

// Middleware to limit requests from a single IP
func rateLimitMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// In a real app behind a reverse proxy, you would get the real IP
		// from the X-Forwarded-For header.
		ip := r.RemoteAddr

		// Log every request attempt to the summarize endpoint
		LogComponent("RATE_LIMITER", "Request received for %s from IP: %s", r.URL.Path, ip)

		mu.Lock()
		// Check if the visitor has a limiter yet
		if _, found := visitors[ip]; !found {
			// Allow 10 requests per minute (1 request every 6 seconds)
			visitors[ip] = rate.NewLimiter(rate.Every(6*time.Second), 1)
		}
		mu.Unlock()

		// If the visitor's limiter doesn't allow the request, block them.
		if !visitors[ip].Allow() {
			LogWarn("Rate limit exceeded for IP: %s", ip)
			http.Error(w, "Too Many Requests", http.StatusTooManyRequests)
			return
		}

		// Otherwise, serve the request
		next.ServeHTTP(w, r)
	})
}
