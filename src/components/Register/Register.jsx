import React, { useState } from "react";
import axios from "axios";
import "./register.css";

axios.defaults.baseURL = "http://localhost:3000";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = credentials.name.trim();
    if (!trimmedName) {
      setErrors(["El nombre es obligatorio"]);
      return; 
    }

    // Validación adicional para otros campos (correo electrónico, contraseña, etc.)
    const trimmedEmail = credentials.email.trim();
    if (!trimmedEmail || !/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setErrors(["Correo electrónico no válido"]);
      return;
    }

    const trimmedPassword = credentials.password.trim();
    if (!trimmedPassword || trimmedPassword.length < 6) {
      setErrors(["La contraseña debe tener al menos 6 caracteres"]);
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      setErrors(["Las contraseñas no coinciden"]);
      return;
    }

    try {
      const response = await axios.post("/users/register", {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      });
      console.log(response);

      window.location.href = "/login";

    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.errors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <h1 className="title">Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            className="form-control"
          />
          {errors && errors.some((error) => error.includes("name")) && (
            <span className="error">{errors[0]}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="form-control"
          />
          {errors && errors.some((error) => error.includes("email")) && (
            <span className="error">{errors[0]}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="form-control"
          />
          {errors && errors.some((error) => error.includes("password")) && (
            <span className="error">{errors[0]}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            className="form-control"
          />
          {errors && errors.some((error) => error.includes("confirmPassword")) && (
            <span className="error">{errors[0]}</span>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
      {errors && (
        <ul className="errors">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Register;
