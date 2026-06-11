import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { fetchLiveMarketCalendar } from '../services/economicService.js';

const router = express.Router();

router.get('/calendar', authenticateToken, async (req, res) => {
  try {
    const { from, to } = req.query;
    
    const today = new Date().toISOString().split('T')[0];
    const startDate = from || today;
    
    const scaleOut = new Date();
    scaleOut.setDate(scaleOut.getDate() + 7);
    const endDate = to || scaleOut.toISOString().split('T')[0];

    const pipelineData = await fetchLiveMarketCalendar(startDate, endDate);
    res.json(pipelineData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;