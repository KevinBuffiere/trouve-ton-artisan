import { Op } from 'sequelize';
import { validationResult, body } from 'express-validator';
import { Artisan, Specialty, Category } from '../models/index.js';
import { sendContactEmail } from '../services/mailService.js';

const baseInclude = [
  {
    model: Specialty,
    as: 'specialty',
    attributes: ['id', 'name', 'slug'],
    include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'slug'] }],
  },
];

function getIncludeOptions(categorySlug) {
  if (!categorySlug) {
    return baseInclude;
  }
  return [
    {
      ...baseInclude[0],
      include: [
        {
          ...baseInclude[0].include[0],
          where: { slug: categorySlug },
        },
      ],
    },
  ];
}

export async function listArtisans(req, res, next) {
  try {
    const { q, category, highlighted, limit } = req.query;
    const where = {};

    if (q) {
      const pattern = `%${q}%`;
      where[Op.or] = [
        { name: { [Op.like]: pattern } },
        { shortDescription: { [Op.like]: pattern } },
      ];
    }

    if (highlighted === 'true') {
      where.highlighted = true;
    }

    const parsedLimit = Number.parseInt(limit, 10);
    const safeLimit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : undefined;

    const artisans = await Artisan.findAll({
      where,
      limit: safeLimit,
      order: [highlighted === 'true' ? ['rating', 'DESC'] : ['name', 'ASC']],
      include: getIncludeOptions(category),
    });

    res.json({ status: 'success', data: artisans });
  } catch (error) {
    next(error);
  }
}

export async function getArtisanBySlug(req, res, next) {
  try {
    const { slug } = req.params;
    const artisan = await Artisan.findOne({ where: { slug }, include: getIncludeOptions() });
    if (!artisan) {
      return res.status(404).json({ status: 'error', message: 'Artisan introuvable' });
    }
    return res.json({ status: 'success', data: artisan });
  } catch (error) {
    return next(error);
  }
}

export const contactValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Le nom est obligatoire.'),
  body('email').isEmail().withMessage('Adresse email invalide.'),
  body('subject').trim().isLength({ min: 3 }).withMessage("L'objet est obligatoire."),
  body('message').trim().isLength({ min: 10 }).withMessage('Le message doit contenir au moins 10 caractères.'),
  body('phone').optional({ checkFalsy: true }).trim().isLength({ min: 6, max: 25 }).withMessage('Numéro de téléphone invalide.'),
];

export async function contactArtisan(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ status: 'error', errors: errors.array() });
    }

    const { slug } = req.params;
    const artisan = await Artisan.findOne({ where: { slug } });
    if (!artisan) {
      return res.status(404).json({ status: 'error', message: 'Artisan introuvable' });
    }

    await sendContactEmail({ artisan, payload: req.body });

    return res.status(202).json({ status: 'success', message: 'Message transmis à l\'artisan.' });
  } catch (error) {
    return next(error);
  }
}
