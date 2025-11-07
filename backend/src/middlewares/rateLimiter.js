import { RateLimiterMemory } from 'rate-limiter-flexible';

const points = Number(process.env.RATE_LIMIT_POINTS || 100);
const duration = Number(process.env.RATE_LIMIT_DURATION || 900);

const rateLimiter = new RateLimiterMemory({
  points,
  duration,
});

export async function rateLimiterMiddleware(req, res, next) {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (error) {
    res.status(429).json({ status: 'error', message: 'Trop de requêtes. Veuillez réessayer plus tard.' });
  }
}
