import HttpError from "../util/http-error.js";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

const DUMMY_GAMES = [
  {
    id: 1,
    title: "Catan",
    category: "Stratégie",
    minPlayers: 3,
    maxPlayers: 4,
    length: 60,
    userId: "u1",
  },
  {
    id: 2,
    title: "Pandemic",
    category: "Coopératif",
    minPlayers: 2,
    maxPlayers: 4,
    length: 45,
    userId: "u1",
  },
  {
    id: 3,
    title: "7 wonders",
    category: "Famille",
    minPlayers: 2,
    maxPlayers: 7,
    length: 30,
    userId: "u1",
  },
];

// méthode pour obtenir les jeux :
const getGames = (req, res, next) => {
  res.json({ games: DUMMY_GAMES });
};

// méthode pour obtenir un jeu spécifique :
const getGamesById = (req, res, next) => {
  const gameId = req.params.gameId;
  const game = DUMMY_GAMES.find((game) => {
    return game.id === gameId;
  });
  if (!game) {
    return next(new HttpError("Le jeu n'a pas été trouvé ...", 404));
  }

  res.json({ game });
};

// méthode pour créer un jeu :
const createGame = (req, res, next) => {
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
  const createdGame = {
    id: uuidv4(),
    title,
    category,
    minPlayers,
    maxPlayers,
    length,
    userId: req.userData.userId || userId,
  };

  DUMMY_GAMES.push(createdGame);
  // le jeu a été créé avec succès :
  res.status(201).json({ game: createdGame });
};

// méthode pour modifier un jeu :
const updateGame = (req, res, next) => {
  const { title, category, minPlayers, maxPlayers, length } = req.body;
  const gameId = req.params.gameId;
  const updatedGame = { ...DUMMY_GAMES.find((game) => game.id === gameId) };
  const gameIndex = DUMMY_GAMES.findIndex((game) => game.id === gameId);

  if (title) updatedGame.title = title;
  if (category) updatedGame.category = category;
  if (minPlayers) updatedGame.minPlayers = minPlayers;
  if (maxPlayers) updatedGame.maxPlayers = maxPlayers;
  if (length) updatedGame.length = length;

  DUMMY_GAMES[gameIndex] = updatedGame;

  // le jeu a été mis à jour avec succès :
  res.status(200).json({ game: updateGame });
};

// méthode pour supprimer un jeu :
const deleteGame = (req, res, next) => {
  const gameId = req.params.gameId;
  DUMMY_GAMES = DUMMY_GAMES.filter((game) => game.id !== gameId);
  // le jeu a été supprimé avec succès :
  res.status(200).json({ message: "Le jeu a été supprimé." });
};

export default {
  getGames,
  getGamesById,
  createGame,
  updateGame,
  deleteGame,
};