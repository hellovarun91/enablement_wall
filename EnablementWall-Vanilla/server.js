#!/usr/bin/env node
/**
 * BrightSign Production Server - Vanilla JS Version
 * Lightweight Node.js server for XT1144 hardware
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const BUILD_DIR = path.join(__dirname, 'build');

// MIME types
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let filePath = decodeURIComponent(req.url);

  // Remove query parameters and hash
  const queryIndex = filePath.indexOf('?');
  if (queryIndex !== -1) {
    filePath = filePath.substring(0, queryIndex);
  }
  const hashIndex = filePath.indexOf('#');
  if (hashIndex !== -1) {
    filePath = filePath.substring(0, hashIndex);
  }

  // Default to index.html
  if (filePath === '/') {
    filePath = '/index.html';
  }

  let fullPath = path.join(BUILD_DIR, filePath);

  // Check if file exists
  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found - serve index.html for SPA routing
      fullPath = path.join(BUILD_DIR, 'index.html');
      filePath = '/index.html';
    }

    const ext = path.extname(fullPath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(fullPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Vanilla JS Server running at http://127.0.0.1:${PORT}`);
});
