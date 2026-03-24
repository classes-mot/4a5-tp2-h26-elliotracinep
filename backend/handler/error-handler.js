function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }
  // le code de l'erreur est renvoyé :
  res.status(error.code || 500);
  // le message de l'erreur est renvoyé :
  res.json({ message: error.message || "Une erreur inconnue est survenue !" });
}
export default errorHandler;

// gestion des erreurs