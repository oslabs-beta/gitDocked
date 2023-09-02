import { Router } from 'express';
import { container } from '../controllers/containerController';

const router = Router();

router.get('/metrics', container.getMetrics, (req, res, next) => {
    
})