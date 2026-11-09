import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './server/db.js'; // opens data/study_mats.db with node:sqlite
import { handleApiRequest } from './server/api.js';
import { getStats } from './server/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, 'dist');
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5173;
const HOST = process.env.HOST || '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.webmanifest': 'application/manifest+json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer(async (req, res) => {
  // Check if API route
  if (req.url && req.url.startsWith('/api')) {
    return handleApiRequest(req, res);
  }

  // Static file serving from dist/
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let filePath = path.join(DIST_DIR, url.pathname);

  // If path is root or directory, serve index.html
  if (url.pathname === '/' || !path.extname(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  // Check if file exists
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    return fs.createReadStream(filePath).pipe(res);
  }

  // SPA fallback to index.html
  const indexPath = path.join(DIST_DIR, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    return fs.createReadStream(indexPath).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

function startServer(portToTry) {
  server.listen(portToTry, HOST, () => {
    const stats = getStats();
    console.log(`\n🚀 UM MatE Academy Server with SQLite is running!`);
    console.log(`   ➜ Local:    http://localhost:${portToTry}/`);
    console.log(`   ➜ Database: ${stats.dbPath}`);
    console.log(`   ➜ SQLite:   Active (${stats.passedCount} passed, ${stats.labsCount} labs, ${stats.readingsCount} readings)\n`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const currentPort = err.port || PORT;
    console.warn(`⚠️ Port ${currentPort} is already in use.`);
    const nextPort = currentPort + 1;
    console.log(`   Trying next port: ${nextPort}...`);
    startServer(nextPort);
  } else {
    console.error('Server error:', err);
  }
});

startServer(PORT);
