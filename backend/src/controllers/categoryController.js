import { Category, Specialty } from '../models/index.js';

export async function getCategories(req, res, next) {
  try {
    const categories = await Category.findAll({
      order: [['name', 'ASC']],
      include: [{ model: Specialty, as: 'specialties', attributes: ['id', 'name', 'slug'] }],
    });
    res.json({ status: 'success', data: categories });
  } catch (error) {
    next(error);
  }
}
