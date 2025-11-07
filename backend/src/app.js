import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import { rateLimiterMiddleware } from './middlewares/rateLimiter.js';
import { apiKeyGuard } from './middlewares/apiKey.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandler.js';

const app = express();

const allowedOrigin = process.env.CLIENT_URL || '*';

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));
app.use(morgan('combined'));
app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-API-KEY'],
  }),
);
app.use(express.json({ limit: '100kb' }));
app.use(rateLimiterMiddleware);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

app.use('/api', apiKeyGuard, routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
