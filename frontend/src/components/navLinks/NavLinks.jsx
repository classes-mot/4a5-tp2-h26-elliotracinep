import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/app-context";
const NavLinks = () => {
  const auth = useContext(AppContext);
  return (
    <ul className="tp1-navlink">
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login">se connecter</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <ul>
          <li>
            <NavLink to="" onClick={auth.logout}>
              se deconnecter
            </NavLink>
          </li>
          <li>
            <NavLink to="add">Créer un jeu</NavLink>
          </li>
        </ul>
      )}
    </ul>
  );
};
export default NavLinks;
