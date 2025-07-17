@echo off
TITLE Install Python Dependencies

ECHO ============================================
ECHO Installing Python Dependencies...
ECHO ============================================
ECHO.

REM Change directory to the script's location
cd /d "%~dp0"

REM Check if Python is installed
WHERE python >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    ECHO [ERROR] Python is not found.
    ECHO Please install Python from https://www.python.org/downloads/
    ECHO and make sure it's added to your system's PATH.
    EXIT /B 1
)
ECHO Python found.

REM Create virtual environment if it doesn't exist
IF NOT EXIST venv (
    ECHO Creating virtual environment...
    python -m venv venv
    IF %ERRORLEVEL% NEQ 0 (
        ECHO [ERROR] Failed to create virtual environment. Exiting.
        EXIT /B 1
    )
    ECHO Virtual environment created.
)

REM Activate the virtual environment
CALL venv\Scripts\activate.bat
IF %ERRORLEVEL% NEQ 0 (
    ECHO [ERROR] Failed to activate virtual environment. Exiting.
    EXIT /B 1
)
ECHO Virtual environment activated.

ECHO.
ECHO Installing dependencies from requirements.txt...
pip install -r requirements.txt
IF %ERRORLEVEL% NEQ 0 (
    ECHO.
    ECHO [ERROR] 'pip install' failed. Please check the error messages above.
    ECHO Make sure you have a stable internet connection.
    EXIT /B 1
)

ECHO.
ECHO Python dependencies installed successfully.
