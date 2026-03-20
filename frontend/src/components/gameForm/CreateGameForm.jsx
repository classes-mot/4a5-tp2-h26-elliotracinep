import "./CreateGameForm.css";
import game_list from "../../data/liste-jeux-exemple";
import { useState } from "react";
import { AppContext } from "../../context/app-context";
import { useContext } from "react";

const GameForm = () => {
  const game = useContext(AppContext);
  const [emptyTitle, setIsTitleEmpty] = useState(false);
  const [emptyCategory, setIsCategoryEmpty] = useState(false);
  const [emptyMinPlayers, setIsMinPlayersEmpty] = useState(false);
  const [emptyMaxPlayers, setIsMaxPlayersEmpty] = useState(false);
  const [emptyLength, setIsLengthEmpty] = useState(false);

  function addGameSubmitHandler(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd);
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

    const newGame = {
      id: game_list.length + 1,
      title: data.title,
      category: data.category,
      minPlayers: data.minPlayers,
      maxPlayers: data.maxPlayers,
      length: data.length,
    };
    game_list.push(newGame);
    game.saveGame(game_list);
    console.log(newGame);
    event.target.reset();
  }

  return (
    <form onSubmit={addGameSubmitHandler} className="create-game-form">
      <h2>Ajout d'un jeu</h2>
      <div>
        <div>
          <label htmlFor="title">Titre</label>
          <input id="title" name="title" type="text" required></input>
        </div>
        {emptyTitle ? (
          <div>
            <p>Le titre ne peut pas être vide.</p>
          </div>
        ) : null}
        <div>
          <label htmlFor="category">Catégorie</label>
          <input id="category" name="category" type="text" required></input>
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
          <input id="length" name="length" type="number" required></input>
        </div>
        {emptyLength ? (
          <div>
            <p>La longueur du jeu ne peut pas être de 0.</p>
          </div>
        ) : null}
        <div className="btn-section">
          <button type="reset" className="tp1-form-btn-reset">effacer</button>
          <button type="submit" className="tp1-form-btn-save">enregistrer</button>
        </div>
      </div>
    </form>
  );
};
export default GameForm;
