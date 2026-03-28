import express from "express";
import gameRoutes from "./routes/game-routes.js";
import userRoutes from "./routes/user-routes.js";
import errorHandler from "./handler/error-handler.js";
import cors from "cors";
import { connectDB } from "./util/bd.js";

await connectDB();

const app = express();
app.use(cors());

app.use(express.json());

// les routes
// pour les jeux :
app.use("/api/jeux", gameRoutes);
// pour les utilisateurs :
app.use("/api/users", userRoutes);

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
