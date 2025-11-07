import { Router } from 'express';
import categoryRoutes from './categoryRoutes.js';
import artisanRoutes from './artisanRoutes.js';

const router = Router();

router.use('/categories', categoryRoutes);
router.use('/artisans', artisanRoutes);

export default router;
