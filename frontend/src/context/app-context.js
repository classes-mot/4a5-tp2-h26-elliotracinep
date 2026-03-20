import { createContext } from "react";

export const AppContext = createContext({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
  gameList: null,
  deleteGame: () => {},
  saveGame: () => {},
});
