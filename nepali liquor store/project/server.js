/**
 * Simple HTTP Server for Royal Liquor Store
 * Serves the website on localhost
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Server configuration
const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

// Create HTTP server
const server = http.createServer((req, res) => {
    // Parse the URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;

    // Default to index.html if root is requested
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Get the file path
    const filePath = path.join(__dirname, pathname);
    const extname = path.extname(filePath).toLowerCase();

    // Set CORS headers for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>404 - Page Not Found</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            text-align: center; 
                            padding: 50px; 
                            background: #f5f5f5; 
                        }
                        .error-container { 
                            background: white; 
                            padding: 30px; 
                            border-radius: 10px; 
                            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
                        }
                        h1 { color: #e74c3c; }
                        a { color: #3498db; text-decoration: none; }
                        a:hover { text-decoration: underline; }
                    </style>
                </head>
                <body>
                    <div class="error-container">
                        <h1>404 - Page Not Found</h1>
                        <p>The page you're looking for doesn't exist.</p>
                        <a href="/">Go back to homepage</a>
                    </div>
                </body>
                </html>
            `);
            return;
        }

        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1>');
                return;
            }

            // Set the appropriate content type
            const contentType = mimeTypes[extname] || 'application/octet-stream';
            res.writeHead(200, { 'Content-Type': contentType });

            // Send the file content
            res.end(data);
        });
    });
});

// Start the server
server.listen(PORT, HOST, () => {
    console.log('🚀 Royal Liquor Store Server is running!');
    console.log(`📍 Local: http://${HOST}:${PORT}`);
    console.log(`🌐 Network: http://${HOST}:${PORT}`);
    console.log('');
    console.log('📁 Serving files from:', __dirname);
    console.log('📋 Press Ctrl+C to stop the server');
    console.log('');
    console.log('✨ Your website is now live on localhost!');
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server stopped successfully');
        process.exit(0);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception:', err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
