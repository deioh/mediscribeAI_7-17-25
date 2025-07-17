
# 🩺 MedScribe AI

MedScribe AI is a modern web application that serves as an AI-powered medical transcription assistant. It leverages the Google Gemini API to expand clinical shorthand into clear, professional, and complete patient notes in real-time.

This version has been updated with a secure backend proxy to protect your API key and allow for local network access.

## ✨ Features

- **Secure API Key Handling**: Your Google Gemini API key is kept secure on a backend server and is never exposed to the browser.
- **Local Network Access**: Run the app on your computer and access it from your phone or other devices on the same network.
- **AI-Powered Expansion & Summarization**: Uses the Gemini API to accurately expand medical shorthand or summarize it into a concise narrative.
- **Streaming Responses**: The generated note is streamed word-by-word for a highly responsive user experience.
- **Clean & Professional UI**: A responsive, themeable, two-panel layout that is easy to use on any device.
- **Copy to Clipboard**: Easily copy the generated note with a single click.

## ⚙️ How It Works

The project now uses a client-server architecture for improved security and functionality:

- **Frontend (Client)**: A single-page application built with [Preact](https://preactjs.com/). It sends user input to the backend and streams the response to the UI.
- **Backend (Server)**: A lightweight [Node.js](https://nodejs.org/) server using [Express](https://expressjs.com/). It acts as a secure proxy that:
    1.  Receives requests from the frontend.
    2.  Securely adds your `API_KEY` (from the `.env` file).
    3.  Calls the Google Gemini API.
    4.  Streams the response back to the frontend.
- **AI Model**: [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash-preview-04-17` model).
- **Build & Dev Tools**: [Vite](https://vitejs.dev/) for the frontend dev server and [Concurrently](https://www.npmjs.com/package/concurrently) to run both frontend and backend servers with one command.
- **Styling**: Plain CSS with CSS Variables for theming.

## 🚀 How to Use (for Windows)

Follow these steps to get MedScribe AI running on your local machine.

### Prerequisites

You must have [Node.js](https://nodejs.org/) installed on your computer. Please download and install the **LTS (Long-Term Support)** version if you don't have it.

### Step 1: Place Files in a Folder

Create a new folder on your computer (e.g., `MedScribeAI`) and place all the project files inside it.

### Step 2: Create the `run.bat` file

Create a new file in your project folder named `run.bat` and paste the following code into it. This script will automate the setup for you.

```bat
@echo off
TITLE MedScribe AI Runner

ECHO ============================================
ECHO MedScribe AI Setup & Run Script
ECHO ============================================
ECHO.

REM Check if node is installed
WHERE node >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO [ERROR] Node.js is not found.
    ECHO Please install Node.js (LTS version) from https://nodejs.org/
    ECHO and make sure it's added to your system's PATH.
    PAUSE
    EXIT /B 1
)
ECHO Node.js found.

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
ECHO.
ECHO ============================================
ECHO Step 1: Installing project dependencies...
ECHO (This may take a moment)
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
ECHO Dependencies installed successfully.
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
```

### Step 3: Create the API Key File

1.  In the same project folder, create a new file and name it **exactly** `.env` (the name starts with a dot and it has no extension like `.txt`).
2.  Open the `.env` file with a text editor (like Notepad).
3.  Add the following line, replacing `YOUR_GEMINI_API_KEY_HERE` with your actual Google Gemini API key:
    ```
    API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```
4.  Save and close the file. **This file is read by the backend server only and is never sent to the browser.**

### Step 4: Run the Application

You are all set! Just **double-click the `run.bat` file**.

A command prompt will open, install the necessary packages, and then start both the backend and frontend servers. It will display a **Local** URL (e.g., `http://localhost:5173`) and a **Network** URL (e.g., `http://192.168.1.5:5173`). Open either URL in your web browser to use MedScribe AI. The Network URL can be used by other devices on your Wi-Fi network.