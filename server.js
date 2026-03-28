import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// API route loader (Vercel serverless functions simülasyonu)
const apiDir = path.join(__dirname, 'api');
const apiFiles = fs.readdirSync(apiDir).filter(file => file.endsWith('.js'));

// API Dosyalarını otomatik route olarak yükle
for (const file of apiFiles) {
  const routeName = file.replace('.js', '');
  const modulePath = `./api/${file}`;
  
  // Vercel function'ları genellikle default export (req, res) formatındadır
  app.all(`/api/${routeName}`, async (req, res) => {
    try {
      const { default: handler } = await import(modulePath);
      if (typeof handler === 'function') {
        await handler(req, res);
      } else {
        res.status(500).json({ error: `Handler in ${file} is not a function` });
      }
    } catch (error) {
      console.error(`Error handling /api/${routeName}:`, error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  });
}

// Sağlık kontrolü (Railway healthcheck için)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Statik frontend dosyalarını sun (Build sonrası)
const clientDist = path.join(__dirname, 'client', 'dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  
  // React Router için tüm diğer istekleri index.html'e yönlendir
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientDist, 'index.html'));
    } else {
      res.status(404).json({ error: 'API endpoint not found' });
    }
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API endpoints loaded: ${apiFiles.map(f => `/api/${f.replace('.js', '')}`).join(', ')}`);
});
