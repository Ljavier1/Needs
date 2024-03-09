import React from 'react';
import { Link } from 'react-router-dom';
import './homePage.css';

const HomePage = () => {

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="home-page">
      <h1>Bienvenido a Cousera!</h1>
      <p>Encuentra las tareas digitales que necesitas a través de nuestra plataforma.</p>
      <div className="actions">
        <button onClick={handleRegisterClick}>Registrarse</button> {/* Use onClick for register button */}
        <button>Ingresar</button>
        <Link to="/tasks">Ver tareas</Link>
      </div>
    </div>
  );
};

export default HomePage;
