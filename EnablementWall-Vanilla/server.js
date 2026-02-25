#!/usr/bin/env node
/**
 * BrightSign Production Server - Vanilla JS Version
 * Lightweight Node.js server for XT1144 hardware
 * Supports HTTP Range requests for video streaming
 */

var http = require('http');
var fs = require('fs');
var path = require('path');

var PORT = 3001;
var BUILD_DIR = path.join(__dirname, 'build');

// MIME types
var MIME_TYPES = {
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
  '.woff2': 'font/woff2',
  '.otf': 'font/otf'
};

// File types that should use Range/streaming
var STREAM_EXTENSIONS = { '.mp4': true };

var server = http.createServer(function(req, res) {
  var filePath = decodeURIComponent(req.url);

  // Remove query parameters and hash
  var queryIndex = filePath.indexOf('?');
  if (queryIndex !== -1) {
    filePath = filePath.substring(0, queryIndex);
  }
  var hashIndex = filePath.indexOf('#');
  if (hashIndex !== -1) {
    filePath = filePath.substring(0, hashIndex);
  }

  // Default to index.html
  if (filePath === '/') {
    filePath = '/index.html';
  }

  var fullPath = path.join(BUILD_DIR, filePath);

  fs.stat(fullPath, function(err, stat) {
    // File not found - serve index.html for SPA routing
    if (err || !stat.isFile()) {
      fullPath = path.join(BUILD_DIR, 'index.html');
      fs.readFile(fullPath, function(err2, data) {
        if (err2) {
          res.writeHead(500);
          res.end('Server Error');
          return;
        }
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
        res.end(data);
      });
      return;
    }

    var ext = path.extname(fullPath);
    var contentType = MIME_TYPES[ext] || 'application/octet-stream';
    var fileSize = stat.size;

    // --- Range request handling for video files ---
    if (STREAM_EXTENSIONS[ext] && req.headers.range) {
      var range = req.headers.range;
      var parts = range.replace(/bytes=/, '').split('-');
      var start = parseInt(parts[0], 10);
      var end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      // Clamp to valid range
      if (start >= fileSize) {
        res.writeHead(416, {
          'Content-Range': 'bytes */' + fileSize
        });
        res.end();
        return;
      }
      if (end >= fileSize) {
        end = fileSize - 1;
      }

      var chunkSize = end - start + 1;
      var stream = fs.createReadStream(fullPath, { start: start, end: end });

      res.writeHead(206, {
        'Content-Range': 'bytes ' + start + '-' + end + '/' + fileSize,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType
      });

      stream.pipe(res);

      stream.on('error', function() {
        res.writeHead(500);
        res.end('Stream Error');
      });

      return;
    }

    // --- Streamable files without Range header: signal Range support ---
    if (STREAM_EXTENSIONS[ext]) {
      var fullStream = fs.createReadStream(fullPath);

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': fileSize,
        'Accept-Ranges': 'bytes'
      });

      fullStream.pipe(res);

      fullStream.on('error', function() {
        res.writeHead(500);
        res.end('Stream Error');
      });

      return;
    }

    // --- Regular files (HTML, JSON, CSS, images, fonts) ---
    fs.readFile(fullPath, function(err2, data) {
      if (err2) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': fileSize,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, '127.0.0.1', function() {
  console.log('Vanilla JS Server running at http://127.0.0.1:' + PORT);
});
