@echo off
echo Starting backend (Flask app)...
start cmd /k "C:\Python312\python.exe app.py"

echo Starting frontend (Vite dev server)...
start cmd /k "npm run client"

echo Deployment commands initiated. Check the new command windows for output.
