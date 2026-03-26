import mongoose from "mongoose";
import { Game } from "../models/game";
import { User } from "../models/user";

const url = "mongodb://localhost:27017/TP02";

mongoose
  .connect(url)
  .then(() => {
    console.log("La connexion a été établie avec succès!");
  })
  .catch(() => {
    console.log("La connexion a échoué !");
  });

const addGame = async (req, res, next) => {
  const createdGame = new Task({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    minPlayers: req.body.minPlayers,
    maxPlayers: req.body.maxPlayers,
    length: req.body.length,
  });
  const result = await createdGame.save();
  res.status(201).json(result);
};

const getGames = async (req, res, next) => {
  const games = await Game.find().exec();
  res.json(games);
};

const addUser = async (req, res, next) => {
  const createdUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  const result = await createdUser.save();
  res.status(201).json(result);
};

const getUsers = async (req, res, next) => {
  const users = await User.find().exec();
  res.json(users);
};
export { addGame, getGames, addUser, getUsers };
