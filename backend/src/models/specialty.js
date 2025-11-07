import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class Specialty extends Model {}

Specialty.init(
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
    modelName: 'Specialty',
    tableName: 'specialties',
  },
);

export default Specialty;
