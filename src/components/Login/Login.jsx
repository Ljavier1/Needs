import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext.jsx";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);

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
      
    } catch (error) {
      console.error("Login error:", error);
      ario
    }
  };

  return (
    <>
      <h2>Ingresar</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Correo
          <input
            type="email"
            name="email"
            value={credentials.email}
            placeholder="Ingresa tu correo"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Contraseña
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Ingresar</button>
      </form>
    </>
  );
};

export default Login;
