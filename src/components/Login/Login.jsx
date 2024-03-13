import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import Tasks from "../Tasks/Tasks.jsx"; // Importa el componente de Tasks

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const [redirectToTasks, setRedirectToTasks] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("users/login", credentials);
      await login(response.data.data.token);
      setRedirectToTasks(true); // Redirige al usuario después del inicio de sesión
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      {redirectToTasks ? (
        <Tasks />
      ) : (
        <>
          <h2>Ingresar</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Correo
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                placeholder="Ingresa tu correo"
                onChange={handleChange}
              />
            </label>
            <label htmlFor="password">
              Contraseña
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                placeholder="Ingresa tu contraseña"
                onChange={handleChange}
              />
            </label>
            <button type="submit">Ingresar</button>
          </form>
        </>
      )}
    </>
  );
};

export default Login;
