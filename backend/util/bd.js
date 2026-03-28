import mongoose from "mongoose";

let estConectee = false;

export const connectDB = async () => {
  if (estConectee) return;
  uri = "mongodb://localhost:27017/bdTP02";

  try {
    await mongoose.connect(uri);
    estConectee = true;
    console.log("La connexion à la base de données est réussie!");
  } catch (erreur) {
    console.error(
      "La connexion à la base de données a échoué.",
      erreur.message,
    );
    process.exit(1);
  }
};
