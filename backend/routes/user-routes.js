import express from "express";
import usersControllers from "../controllers/users-controllers.js";
import { check } from "express-validator";

const userRoutes = express.Router();

// route pour l'enregistrement d'un utilisateur :
userRoutes.post(
  "/register",
  [
    check("username").not().isEmpty(),
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
  ],
  usersControllers.registerUser,
);
// route pour la connexion d'un utilisateur :
userRoutes.post("/login", usersControllers.login);

export default userRoutes;
