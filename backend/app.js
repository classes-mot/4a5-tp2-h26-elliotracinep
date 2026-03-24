import express from "express";
import gameRoutes from "./routes/game-routes.js";
import errorHandler from "./handler/error-handler.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

// les routes
app.use("/api/jeux", gameRoutes);

// gestion si la route n'existe pas
app.use((req, res, next) => {
  const erreur = new Error("La route est introuvable !");
  erreur.code = 404;
  next(erreur);
});

app.use(errorHandler);

// activation du serveur
app.listen(5000, () => {
  console.log("Le serveur est activé au : ", "http//localhost:5000");
});
