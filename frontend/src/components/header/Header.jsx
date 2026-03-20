import "./Header.css";
import { Link } from "react-router-dom";
import NavLinks from "../navLinks/NavLinks";


export default function Header() {
  let titre = "Le travail pratique 1 !";

  return (
    <header className="tp1-header">
      <h1 className="tp1-header-title">
       <Link to="/">{titre}</Link>
      </h1>
      <nav className="tp1-header-nav">
        <NavLinks/>
      </nav>
    </header>
  );
}
