export function apiKeyGuard(req, res, next) {
  const expectedKey = process.env.API_KEY;
  if (!expectedKey) {
    return res.status(500).json({ status: 'error', message: "Clé d'API non configurée" });
  }

  const providedKey = req.header('x-api-key');
  if (!providedKey || providedKey !== expectedKey) {
    return res.status(401).json({ status: 'error', message: "Accès non autorisé" });
  }

  return next();
}
