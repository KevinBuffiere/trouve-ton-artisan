import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

class Artisan extends Model {}

Artisan.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceArea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coverImageUrl: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    highlighted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Artisan',
    tableName: 'artisans',
  },
);

export default Artisan;
