import express from "express";
import { check } from "express-validator";
import gamesController from "../controllers/games-controllers.js";
import checkAuth from "../middleware/check-ath.js";

const monRouter = express.Router();

// chemin pour obtenir les jeux :
monRouter.get("/", gamesController.getGames);

// chemin pour obtenir un jeu spécifique :
monRouter.get("/:gameId", gamesController.getGamesById);

// chemin pour ajouter un jeu :
monRouter.post(
  "/",
  checkAuth,
  [check("title").not().isEmpty(), check("category").not().isEmpty()],
  gamesController.createGame,
);

// chemin pour modifier un jeu :
monRouter.patch("/:gameId", checkAuth, gamesController.updateGame);

// chemin pour supprimer un jeu :
monRouter.delete(":gameId", checkAuth, gamesController.deleteGame);

export default monRouter;
