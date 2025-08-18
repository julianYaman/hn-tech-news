package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestGetOGData(t *testing.T) {
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html")
		w.Write([]byte(`
			<html>
				<head>
					<meta property="og:image" content="https://example.com/image.jpg">
					<meta property="og:description" content="This is a test description.">
				</head>
				<body></body>
			</html>
		`))
	}))
	defer server.Close()

	ogImage, ogDescription, err := getOGData(server.URL)
	if err != nil {
		t.Fatalf("expected no error, got %v", err)
	}

	if ogImage != "https://example.com/image.jpg" {
		t.Errorf("expected ogImage to be 'https://example.com/image.jpg', got '%s'", ogImage)
	}

	if ogDescription != "This is a test description." {
		t.Errorf("expected ogDescription to be 'This is a test description.', got '%s'", ogDescription)
	}
}