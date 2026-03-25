import jwt from "jsonwebtoken";
import HttpError from "../util/http-error.js";

const checkAuth = (res, req, next) => {
  try {
    // création du jeton d'identification
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error("L'authentification a échoué !");
    }
    const decodedToken = jwt.verify(
      token,
      "CléDeSignature!!!!",
    );
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.log("Une erreur est survenue : ", error);
    const monErreur = new HttpError("L'authentification a échoué !", 401);
    return next(monErreur);
  }
};
export default checkAuth;
// gestion du jeton d'authentification