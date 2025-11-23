# Royal Liquor Store - Local Server Startup Script
# PowerShell version

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Royal Liquor Store - Local Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting the local development server..." -ForegroundColor Yellow
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if server.js exists
if (-not (Test-Path "server.js")) {
    Write-Host "ERROR: server.js not found in current directory" -ForegroundColor Red
    Write-Host "Please make sure you're in the correct project folder" -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Starting server on http://localhost:3000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

# Start the server
try {
    node server.js
} catch {
    Write-Host ""
    Write-Host "Server stopped." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
}
