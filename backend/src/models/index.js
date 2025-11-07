import Category from './category.js';
import Specialty from './specialty.js';
import Artisan from './artisan.js';

Category.hasMany(Specialty, { foreignKey: 'categoryId', as: 'specialties' });
Specialty.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

Specialty.hasMany(Artisan, { foreignKey: 'specialtyId', as: 'artisans' });
Artisan.belongsTo(Specialty, { foreignKey: 'specialtyId', as: 'specialty' });

export { Category, Specialty, Artisan };
