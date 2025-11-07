import { Router } from 'express';
import { listArtisans, getArtisanBySlug, contactArtisan, contactValidation } from '../controllers/artisanController.js';

const router = Router();

router.get('/', listArtisans);
router.get('/:slug', getArtisanBySlug);
router.post('/:slug/contact', contactValidation, contactArtisan);

export default router;
