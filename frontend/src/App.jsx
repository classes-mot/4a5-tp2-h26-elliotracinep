import "./App.css";
import GameList from "./components/gameList/GameList";
import ModifyGameForm from "./components/gameForm/ModifyGameForm";
import CreateGameForm from "./components/gameForm/CreateGameForm";
import RootLayout from "./components/Containers/RootLayout";
import ErrorPage from "./components/Containers/ErrorPage";
import Auth from "./components/Containers/Auth";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { AppContext } from "./context/app-context";

const routerUser = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <GameList /> },
      { path: "/games", element: <GameList /> },
      { path: "/edit/:gameId", element: <ModifyGameForm /> },
      { path: "add", element: <CreateGameForm /> },
      { path: "login", element: <Navigate to="/games" replace /> },
    ],
  },
]);

const routerGuest = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <GameList /> },
      { path: "login", element: <Auth /> },
    ],
  },
]);

const App = () => {
  const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
  const storedUserId = sessionStorage.getItem("userId");
  const storeGameList = localStorage.getItem("GameList");

  const [isLoggedIn, setIsLoggedIn] = useState(
    storedIsLoggedIn === "true" ? true : false,
  );
  const [userId, setUserId] = useState(storedUserId);
  const [gameList, setGameList] = useState(
    storeGameList ? JSON.parse(storeGameList) : [],
  );

  const login = (uid) => {
    sessionStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("userId", uid);
    setIsLoggedIn(true);
    setUserId(uid);
  };

  const logout = () => {
    sessionStorage.setItem("isLoggedIn", false);
    sessionStorage.setItem("userId", null);
    setIsLoggedIn(false);
    setUserId(null);
  };

  const saveGame = (liste) => {
    setGameList(liste);
  };

  const deleteGame = (jeu) => {
    let liste = localStorage.getItem("GameList");
    const nouvListe = JSON.parse(liste).filter((game) => game.id !== jeu.id);
    setGameList(nouvListe);
  };

  useEffect(() => {
    localStorage.setItem("GameList", JSON.stringify(gameList));
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        userId,
        login,
        logout,
        deleteGame,
        saveGame,
        gameList,
      }}
    >
      <RouterProvider router={isLoggedIn ? routerUser : routerGuest} />
    </AppContext.Provider>
  );
};

export default App;
