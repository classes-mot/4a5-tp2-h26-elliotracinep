import express from "express";
import usersControllers from "../controllers/users-controllers.js";

const userRoutes = express.Router();

// route pour l'enregistrement d'un utilisateur :
userRoutes.post("/register", usersControllers.registerUser);
// route pour la connexion d'un utilisateur :
userRoutes.post("/login", usersControllers.login);

export default userRoutes;
