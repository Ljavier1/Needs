import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {

  return (
    <div className="home-page">
      <h1>Bienvenido a Cousera!</h1>
      <p>Encuentra las tareas digitales que necesitas a través de nuestra plataforma.</p>
      <div className="actions">
        <Link to="/register">Registrarse</Link>
        <Link to="/login">Ingresar</Link>
        <Link to="/tasks">Ver tareas</Link>
      </div>
    </div>
  );
};

export default HomePage;
