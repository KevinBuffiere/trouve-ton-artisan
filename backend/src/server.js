import './config/env.js';
import { ensureEnvironment } from './config/env.js';
import { initDatabase } from './config/database.js';
import app from './app.js';

const PORT = Number(process.env.PORT || 4000);

async function bootstrap() {
  try {
    ensureEnvironment();
    await initDatabase();
    app.listen(PORT, () => {
      console.info(`API prête sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Impossible de démarrer le serveur', error);
    process.exit(1);
  }
}

bootstrap();
