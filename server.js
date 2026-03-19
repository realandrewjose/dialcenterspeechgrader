import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from web-build directory
app.use(express.static(path.join(__dirname, 'web-build')));

// Set correct MIME type for service worker
app.get('/sw.js', (req, res) => {
  res.type('application/javascript');
  res.sendFile(path.join(__dirname, 'web-build', 'sw.js'));
});

// Set correct MIME type for manifest
app.get('/manifest.json', (req, res) => {
  res.type('application/manifest+json');
  res.sendFile(path.join(__dirname, 'web-build', 'manifest.json'));
});

// SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'web-build', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Server error');
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  Public Speaking Grader Server             ║
╠════════════════════════════════════════════╣
║  Server running at: http://localhost:${PORT}${PORT === 3000 ? '   ' : '  '}║
║  Press Ctrl+C to stop the server           ║
╚════════════════════════════════════════════╝
  `);
});
