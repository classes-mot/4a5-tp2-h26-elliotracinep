import GameIcon from "../gameIcon/GameIcon";
import { Link } from "react-router-dom";
import "./GameCard.css";
import { useContext, useRef } from "react";
import { AppContext } from "../../context/app-context";

export default function GameCard(props) {
  const auth = useContext(AppContext);

  return (
    <>
      <div className="game-item">
        <GameIcon category={props.category} />
        <h1>{props.title}</h1>
        <div className="game-item-text-zone">
          <span className="game-item-text">Catégorie: {props.category}</span>
          <br />
          <span className="game-item-text">
            Joueurs: {props.minPlayers}-{props.maxPlayers}
          </span>
          <br />
          <span className="game-item-text">Durée: {props.length}min</span>
        </div>
        {auth.isLoggedIn && (
          <>
            <Link to={`/edit/${props.id}`}>
              <button className="game-item-modify">Modifier</button>
            </Link>
            <div>
              <button
                className="game-item-delete"
                onClick={() => {
                  auth.deleteGame(props);
                }}
              >
                Supprimer
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
