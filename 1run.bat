@echo off
TITLE MedScribe AI Runner

ECHO ============================================
ECHO MedScribe AI Setup & Run Script
ECHO ============================================
ECHO.

REM Check if Python is installed
WHERE python >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO [ERROR] Python is not found.
    ECHO Please install Python from https://www.python.org/downloads/
    ECHO and make sure it's added to your system's PATH.
    PAUSE
    EXIT /B 1
)
ECHO Python found.


REM Check if pip is installed
WHERE pip >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO [ERROR] pip (Python package installer) is not found.
    ECHO Please ensure pip is installed with Python.
    PAUSE
    EXIT /B 1
)
ECHO pip found.
PAUSE

REM Check if .env file exists
IF NOT EXIST .env (
    ECHO.
    ECHO [ERROR] API Key file not found!
    ECHO Please create a file named '.env' in this folder.
    ECHO Add this line to it: API_KEY=YOUR_GEMINI_API_KEY_HERE
    ECHO Then, replace YOUR_GEMINI_API_KEY_HERE with your actual key.
    ECHO.
    PAUSE
    EXIT /B 1
)

ECHO.
ECHO Found API Key file.
PAUSE

ECHO.
ECHO ============================================
ECHO Step 1: Installing Python dependencies...
ECHO ============================================
CALL install_python_deps.bat
IF %ERRORLEVEL% NEQ 0 (
    ECHO. 
    ECHO [ERROR] Python dependency installation failed. Exiting.
    PAUSE
    EXIT /B 1
)

ECHO.
ECHO Python dependencies installed successfully.
PAUSE

ECHO ============================================
ECHO Step 2: Installing Node.js dependencies...
ECHO ============================================
CALL npm install
IF %ERRORLEVEL% NEQ 0 (
    ECHO.
    ECHO [ERROR] 'npm install' failed. Please check the error messages above.
    ECHO Make sure you have a stable internet connection.
    PAUSE
    EXIT /B 1
)

ECHO.
ECHO Node.js dependencies installed successfully.
ECHO.
ECHO ============================================
ECHO Step 2: Starting the development servers...
ECHO ============================================
ECHO This will start both the backend and frontend servers.
ECHO You can access the app at the Local and Network URLs shown below.
ECHO Press Ctrl+C in this window to stop the servers.
ECHO.
CALL npm run dev

ECHO.
ECHO Servers have been stopped.
PAUSE
