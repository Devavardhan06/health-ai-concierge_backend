#!/bin/bash

# Function to kill child processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $(jobs -p) 2>/dev/null
}

trap cleanup EXIT

echo "Starting Backend..."
# Run from backend directory so 'app' module is found
cd backend
source venv/bin/activate
# uvicorn main:app looks for main.py in current dir
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

echo "Starting Frontend..."
cd frontend
npm run dev -- --port 5173 &
FRONTEND_PID=$!
cd ..

echo "Application is running!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo "Press Ctrl+C to stop."

wait
