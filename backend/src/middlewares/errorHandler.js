export function notFoundHandler(req, res) {
  res.status(404).json({ status: 'error', message: 'Ressource introuvable' });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({ status: 'error', message: 'Une erreur inattendue est survenue.' });
}
