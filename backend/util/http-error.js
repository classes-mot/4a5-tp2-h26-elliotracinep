class HttpError extends Error {
  constructor(msg, statusCode) {
    super(msg);
    this.statusCode = statusCode;
  }
}
export default HttpError;

// gestion d'erreur HTTP