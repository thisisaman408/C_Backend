import express from 'express';
import { getPrediction } from '../services/predictionService';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const inputs = req.body;
    const prediction = await getPrediction(inputs);
    res.json({ prediction });
  } catch (error) {
    console.error('Error in predict route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;