#!/bin/bash

# Load environment variables for development
if [ -f .env.development ]; then
  echo "Loading .env.development..."
  set -a
  source .env.development
  set +a
fi

# Start the backend server
echo "Starting backend server..."
cd backend
go run . &
BACKEND_PID=$!
cd ..

# Start the frontend server
echo "Starting frontend server..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for both processes to exit
wait $BACKEND_PID
wait $FRONTEND_PID