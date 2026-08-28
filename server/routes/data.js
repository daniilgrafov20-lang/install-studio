import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Helper to load JSON
const loadJSON = (filename) => {
  const filePath = path.join(__dirname, '../data', filename);
  return JSON.parse(readFileSync(filePath, 'utf-8'));
};

// GET /api/data/projects
router.get('/projects', (req, res) => {
  try {
    const projects = loadJSON('projects.json');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// GET /api/data/services
router.get('/services', (req, res) => {
  try {
    const services = loadJSON('services.json');
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load services' });
  }
});

// GET /api/data/reviews
router.get('/reviews', (req, res) => {
  try {
    const reviews = loadJSON('reviews.json');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load reviews' });
  }
});

export default router;