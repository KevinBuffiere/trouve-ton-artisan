import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class Category extends Model {}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
  },
);

export default Category;
