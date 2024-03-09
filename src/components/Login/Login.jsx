import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext.jsx";

axios.defaults.baseURL = "http://localhost:3000/api";

const LogIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("users/login", credentials);
      login(response.data.data.token);
    } catch (error) {
      console.log(error);
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
    <>
      <div className="container">
        <form className="inputContainer" onSubmit={handleSubmit}>
          <h3 className="containerTitle">Inicia Sesión</h3>
          <div className="formContainer">
            <input
              className="logIn_input"
              type="email"
              name="email"
              value={credentials.email}
              placeholder="Ingresa tu correo"
              onChange={handleChange}
            />
            <input
              className="logIn_input"
              type="password"
              name="password"
              value={credentials.password}
              placeholder="Ingresa tu Contraseña"
              onChange={handleChange}
            />
            <button className="buttonInput" type="submit">
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LogIn;
