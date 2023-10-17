import { Router } from 'express';
import { container } from '../controllers/containerController';
import { query } from '../models/userModel';
const router = Router();

router.get('/metrics', container.getMetrics, (req, res, next) => {
    
});

router.post('/:id', (req, res) => {
  const id = req.params.id;
});

export default router;