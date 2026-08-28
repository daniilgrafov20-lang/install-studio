import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import leadsRouter from './routes/leads.js';
import dataRouter from './routes/data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// API Routes
app.use('/api/leads', leadsRouter);
app.use('/api/data', dataRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 InStall Studio server running at http://localhost:${PORT}`);
});
