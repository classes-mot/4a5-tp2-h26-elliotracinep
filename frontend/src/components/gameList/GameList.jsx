import "./GameList.css";
import Categories from "../categories/Categories";
import GameCard from "../gameCard/GameCard";
import { useState } from "react";
import game_list from "../../data/liste-jeux-exemple";
function GameList() {
  let gameList = [];
  gameList = JSON.parse(localStorage.getItem("GameList"));
  if (gameList.length == 0) {
    gameList = game_list;
  }
  const [categoryActive, setCategoryActive] = useState("");

  const gameCat = gameList.reduce(
    (acc, game) =>
      acc.includes(game.category) ? acc : acc.concat(game.category),
    [],
  );
  return (
    <div>
      <Categories categories={gameCat} setCatActive={setCategoryActive} />
      <ul className="game-list">
        {gameList.map((game) =>
          !categoryActive || game.category == categoryActive ? (
            <GameCard
              key={game.id}
              id={game.id}
              title={game.title}
              category={game.category}
              minPlayers={game.minPlayers}
              maxPlayers={game.maxPlayers}
              length={game.length}
            />
          ) : null,
        )}
      </ul>
    </div>
  );
}
export default GameList;
