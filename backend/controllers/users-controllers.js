import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import HttpError from "../handler/error-handler.js";

let PLACEHOLDER_USERS = [
  { id: "u1", username: "Bob4023", email: "Bob@mail.com", password: "mdp1" },
  { id: "u2", username: "Beb2025", email: "Beb@mail.com", password: "mdp2" },
];

// méthode pour enregistrer un nouvel utilisateur :
const registerUser = (req, res, next) => {
  const { username, email, password } = req.body;
  const userPasDispo = PLACEHOLDER_USERS.find(
    (user) => user.username === username,
  );
  // le nom d'utilisateur est déjà utilisé :
  if (userPasDispo) {
    res
      .status(422)
      .json({ message: "Ce nom d'utilisateur n'est pas disponible !" });
    return;
  }
  const createdUser = {
    id: uuidv4(),
    username,
    email,
    password,
  };
  setTimeout(() => {
    PLACEHOLDER_USERS.push(createdUser);
    // l'utilisateur a été créé avec succès :
    res.status(201).json({ user: createdUser });
  });
};
// méthode pour se connecter :
const login = (req, res, next) => {
  const { username, password } = req.body;
  const identifiedUser = PLACEHOLDER_USERS.find(
    (user) => user.username === username && user.password === password,
  );
  console.log("Une utilisateur s'est connecté : ", username, password);
  if (!identifiedUser) {
    // la connexion n'a pas été établie :
    res
      .status(401)
      .json({ message: "L'identification a échoué, veuillez réessayer." });
  } else {
    let token;
    try {
      // création du jeton d'identification :
      token = jwt.sign(
        { userId: identifiedUser.id, username: identifiedUser.username },
        "Clé3987snb(*&nDe90238nsdbmsnnSignature!!!!ero837vsc*(&(:5e",
        { expiresIn: "1h" },
      );
    } catch (erreur) {
      const error = new HttpError("La génération du jeton a échoué.", 500);
      return next(error);
    }
    // la connexion s'est faite avec succès :
    res.json({
      message: "La connexion est réussie.",
      userId: identifiedUser.id,
      username: identifiedUser.username,
      email: identifiedUser.email,
      token: token,
    });
  }
};

export default { registerUser, login };
