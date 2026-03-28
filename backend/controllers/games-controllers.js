import HttpError from "../util/http-error.js";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { Game } from "../models/game.js";

// méthode pour obtenir les jeux :
const getGames = async (req, res, next) => {
  try {
    games = await Game.find();
  } catch (err) {
    console.log(err);
    const erreur = new HttpError("Une erreur s'est produite.", 500);
    return next(err);
  }
  if (!games) {
    return next(new HttpError("Les jeux n'ont pas été trouvés.", 404));
  }
  res.json({ jeux: games.toObject({ getters: true }) });
};

// méthode pour obtenir un jeu spécifique :
const getGamesById = async (req, res, next) => {
  const gameId = req.params.gameId;

  let game;
  try {
    game = await Game.findById(gameId);
  } catch (err) {
    console.log(err);
    const erreur = new HttpError("Une erreur s'est produite.", 500);
    return next(err);
  }

  if (!game) {
    return next(new HttpError("Le jeu n'a pas été trouvé ...", 404));
  }

  res.json({ jeu: game.toObject({ getters: true }) });
};

// méthode pour créer un jeu :
const createGame = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log("Une erreur s'est produite ... ", validationErrors);
    return next(
      new HttpError(
        "Les informations saisies ne sont pas valides. Vérifiez votre payload.",
        422,
      ),
    );
  }
  const { title, category, minPlayers, maxPlayers, length, userId } = req.body;
  const createdGame = new Game({
    title,
    category,
    minPlayers,
    maxPlayers,
    length,
    userId: req.userData.userId || userId,
  });
  // ajout du jeu dans la base de données :
  try {
    await createdGame.save();
  } catch (err) {
    const erreur = new HttpError(
      "l'ajout du jeu dans la base de données a échoué.",
      500,
    );
  }
  // le jeu a été créé avec succès :
  res.status(201).json({ game: createdGame });
};

// méthode pour modifier un jeu :
const updateGame = async (req, res, next) => {
  const gametoUpdate = req.body;
  const gameId = req.params.gameId;

  try {
    const updatedGame = await Game.findByIdAndUpdate(gameId, gametoUpdate, {
      new: true,
    });
    if (!updatedGame) {
      return res.status(404).json({ message: "Le jeu est introuvable." });
    }
    // le jeu a été mis à jour avec succès :
    res.status(200).json({ game: updatedGame.toObject({ getters: true }) });
  } catch (err) {
    res.status(500).json({ msg: "Erreur lors de la modification du jeu." });
  }
};

// méthode pour supprimer un jeu :
const deleteGame = async (req, res, next) => {
  const gameId = req.params.gameId;

  try {
    const game = await Game.findByIdAndDelete(gameId);

    if (!task) {
      return res.status(404).json({ msg: "Le jeu est introuvable." });
    }
    // le jeu a été supprimé avec succès :
    res.status(200).json({ message: "Le jeu a été supprimé." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Erreur lors de la suppression du jeu." });
  }
};

export default {
  getGames,
  getGamesById,
  createGame,
  updateGame,
  deleteGame,
};
