import "./LoginForm.css";
import { useState } from "react";
import { AppContext } from "../../context/app-context";
import { useContext } from "react";

export default function LoginForm() {
  const auth = useContext(AppContext);
  const [emptyUsername, setIsUsernameEmpty] = useState(false);
  const [emptyPassword, setIsPasswordEmpty] = useState(false);

  const authSubmitHandler = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (data.username == "") {
      setIsUsernameEmpty(true);
      return;
    }
    if (data.password == "") {
      setIsPasswordEmpty(true);
      return;
    }
    auth.login("u1");
    console.log("data", data);
    event.target.reset();
  };

  return (
    <form onSubmit={authSubmitHandler} className="login-form">
      <h2>Connexion</h2>
      <div>
        <div>
          <label className="username-lbl" htmlFor="username">
            Nom d'utilisateur:
          </label>
          <input
            className="username-in"
            type="text"
            name="username"
            id="username"
            placeholder="Entrez votre nom"
            autoComplete="on"
          />
        </div>
        {emptyUsername && (
          <p className="error">Le nom d'utilisateur ne peut pas être vide</p>
        )}
        <div>
          <label className="password-lbl" htmlFor="password">
            Mot de passe:
          </label>
          <input
            className="password-in"
            type="text"
            name="username"
            id="password"
            placeholder="Entrez votre mot de passe"
            autoComplete="on"
          />
        </div>
        {emptyPassword && (
          <p className="error">Le mot de passe ne peut pas être vide</p>
        )}
        <div>
          <button type="reset" className="tp1-form-btn-reset">
            effacer
          </button>
          <button type="submit" className="tp1-form-btn-login">
            Se connecter
          </button>
        </div>
      </div>
    </form>
  );
}
