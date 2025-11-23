@echo off
echo.
echo ========================================
echo    Royal Liquor Store - Local Server
echo ========================================
echo.
echo Starting the local development server...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if server.js exists
if not exist "server.js" (
    echo ERROR: server.js not found in current directory
    echo Please make sure you're in the correct project folder
    echo.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

echo Starting server on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

REM Start the server
node server.js

echo.
echo Server stopped.
pause
