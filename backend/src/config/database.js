import { Sequelize } from 'sequelize';
import '../config/env.js';

const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  NODE_ENV,
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: true,
    timestamps: true,
  },
});

export async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.info('Connexion à la base de données réussie');
  } catch (error) {
    console.error('Erreur de connexion à la base de données', error);
    throw error;
  }
}
