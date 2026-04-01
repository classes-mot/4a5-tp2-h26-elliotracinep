import express from "express";
import { check } from "express-validator";
import gamesController from "../controllers/games-controllers.js";
import checkAuth from "../middleware/check-auth.js";

const gameRoutes = express.Router();

// chemin pour obtenir les jeux :
gameRoutes.get("/", gamesController.getGames);

// chemin pour obtenir un jeu spécifique :
gameRoutes.get("/:gameId", gamesController.getGamesById);

// chemin pour ajouter un jeu :
gameRoutes.post(
  "/",
  checkAuth,
  [check("title").not().isEmpty(), check("category").not().isEmpty()],
  gamesController.createGame,
);

// chemin pour modifier un jeu :
gameRoutes.patch("/:gameId", checkAuth, gamesController.updateGame);

// chemin pour supprimer un jeu :
gameRoutes.delete("/:gameId", checkAuth, gamesController.deleteGame);

export default gameRoutes;
