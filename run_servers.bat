@echo off
TITLE MedScribe AI Servers

REM Navigate to the application directory
cd /d "%~dp0"

ECHO ============================================
ECHO Starting MedScribe AI development servers...
ECHO ============================================
ECHO.
ECHO This will start both the backend (Python/Waitress) and frontend (Vite) servers.
ECHO You can access the app at the Local and Network URLs shown below.
ECHO Press Ctrl+C in this window to stop the servers.
ECHO.

CALL npm run dev

ECHO.
ECHO Servers have been stopped.
PAUSE