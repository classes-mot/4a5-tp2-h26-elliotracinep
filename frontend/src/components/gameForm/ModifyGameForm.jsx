import { useParams } from "react-router-dom";
import "./ModifyGameForm.css";
import { useState } from "react";
import { AppContext } from "../../context/app-context";
import { useContext } from "react";

export default function GameForm() {
  let gameList = [];
  gameList = JSON.parse(localStorage.getItem("GameList"));

  const game = useContext(AppContext);
  const gameId = useParams().gameId;
  const gameSelected = gameList.find((t) => t.id == gameId);
  const [emptyTitle, setIsTitleEmpty] = useState(false);
  const [emptyCategory, setIsCategoryEmpty] = useState(false);
  const [emptyMinPlayers, setIsMinPlayersEmpty] = useState(false);
  const [emptyMaxPlayers, setIsMaxPlayersEmpty] = useState(false);
  const [emptyLength, setIsLengthEmpty] = useState(false);

  function addGameSubmitHandler(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (data.title == "") {
      setIsTitleEmpty(true);
      return;
    }
    if (data.category == "") {
      setIsCategoryEmpty(true);
      return;
    }
    if (data.minPlayers == 0) {
      setIsMinPlayersEmpty(true);
      return;
    }
    if (data.maxPlayers == 0) {
      setIsMaxPlayersEmpty(true);
      return;
    }
    if (data.length == 0) {
      setIsLengthEmpty(true);
      return;
    }
    const updatedGame = {
      id: gameSelected.id,
      title: data.title,
      category: data.category,
      minPlayers: data.minPlayers,
      maxPlayers: data.maxPlayers,
      length: data.length,
      userId: "u1",
    };
    const gameIndex = gameList.findIndex((t) => t.id == gameId);
    gameList[gameIndex].title = updatedGame.title;
    gameList[gameIndex].category = updatedGame.category;
    gameList[gameIndex].minPlayers = updatedGame.minPlayers;
    gameList[gameIndex].maxPlayers = updatedGame.maxPlayers;
    gameList[gameIndex].length = updatedGame.length;
    console.log(updatedGame);
    game.saveGame(gameList);
    event.target.reset();
  }
  return (
    <form onSubmit={addGameSubmitHandler} className="modify-game-form">
      <h2>Modification d'un jeu</h2>
      <div>
        <div>
          <label htmlFor="title">Titre</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={gameSelected.title}
            required
          ></input>
        </div>
        {emptyTitle ? (
          <div>
            <p>Le titre ne peut pas être vide.</p>
          </div>
        ) : null}
        <div>
          <label htmlFor="category">Catégorie</label>
          <input
            id="category"
            name="category"
            type="text"
            defaultValue={gameSelected.category}
            required
          ></input>
        </div>
        {emptyCategory ? (
          <div>
            <p>La catégorie ne peut pas être vide.</p>
          </div>
        ) : null}
        <div>
          <label htmlFor="minPlayers">Nombre minimum de joueurs</label>
          <input
            id="minPlayers"
            name="minPlayers"
            type="number"
            defaultValue={gameSelected.minPlayers}
            required
          ></input>
        </div>
        {emptyMinPlayers ? (
          <div>
            <p>Le nombre minimum de joueurs ne peut pas être 0.</p>
          </div>
        ) : null}
        <div>
          <label htmlFor="maxPlayers">Nombre maximum de joueurs</label>
          <input
            id="maxPlayers"
            name="maxPlayers"
            type="number"
            defaultValue={gameSelected.maxPlayers}
            required
          ></input>
        </div>
        {emptyMaxPlayers ? (
          <div>
            <p>Le nombre minimum de joueurs ne peut pas être 0.</p>
          </div>
        ) : null}
        <div>
          <label htmlFor="length">Durée du jeu</label>
          <input
            id="length"
            name="length"
            type="number"
            defaultValue={gameSelected.length}
            required
          ></input>
        </div>
        {emptyLength ? (
          <div>
            <p>La longueur du jeu ne peut pas être de 0.</p>
          </div>
        ) : null}
        <div>
          <button className="tp1-form-btn-reset" type="reset">effacer</button>
          <button className="tp1-form-btn-save" type="submit">enregistrer</button>
        </div>
      </div>
    </form>
  );
}
