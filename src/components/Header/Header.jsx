import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-title">
          Cousera
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="header-profile">
              <strong>{user.name}</strong>
            </Link>
            <Link to="/new-task" className="header-link">
              Nueva tarea
            </Link>
            <button className="header-link" onClick={logout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className="header-link">
              Regístrate
            </Link>
            <Link to="/login" className="header-link">
              Iniciar sesión
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
