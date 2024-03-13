import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${user.id}`);
        setProfile(response.data.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/user/${user.id}`,
        profile
      );
      console.log("Perfil actualizado:", response.data.data);

      // Redirection using Link
      <Link to="/profile">Ver perfil</Link>;

    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <>
      <h2>Editar perfil</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Nombre
          <input
            type="text"
            name="name"
            value={profile.name}
            placeholder="Ingresa tu nombre"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Correo
          <input
            type="email"
            name="email"
            value={profile.email}
            placeholder="Ingresa tu correo"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          Contraseña
          <input
            type="password"
            name="password"
            value={profile.password}
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Actualizar perfil</button>
      </form>
      {response && response.data.success && <Link to="/profile">Ver perfil</Link>}
    </>
  );
};

export default EditProfile;
