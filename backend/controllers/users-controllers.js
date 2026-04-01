import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import HttpError from "../handler/error-handler.js";
import { User } from "../models/user.js";

// méthode pour enregistrer un nouvel utilisateur :
const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  } catch (err) {
    console.log(err);
    const error = new HttpError("La création de l'utilisateur a échoué.", 500);
    return next(error);
  }
  console.log("Utilisateur existant : ", existingUser);
  if (existingUser) {
    const error = new HttpError("L'utilisateur existe déjà.", 422);
    return next(error);
  }

  const createdUser = new User({
    username,
    email,
    password,
  });
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("La création de l'utilisateur a échoué.", 500);
    return next(error);
  }
  // l'utilisateur a été créé avec succès :
  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

// méthode pour se connecter :
const login = async (req, res, next) => {
  const { username, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    console.log(err);
    const error = new HttpError("La connexion a échoué.", 500);
    return next(error);
  }
  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("L'identification a échoué.", 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, username: existingUser.username },
      "CléDeSignature!!!!",
      { expiresIn: "1h" },
    );
  } catch (err) {
    const error = new HttpError("Erreur lors de la génération du jeton.", 500);
    return next(error);
  }
  res
    .status(200)
    .json({ userId: existingUser.id, username: existingUser.username, token });
};

export default { registerUser, login };
