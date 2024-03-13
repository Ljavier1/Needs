import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const { user: authUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${authUser.id}`);
        setUser(response.data.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUser();
  }, [authUser]);

  return (
    <>
      <h2>Perfil de usuario</h2>
      <ul>
        <li>Nombre: {user.name}</li>
        <li>Correo: {user.email}</li>
      </ul>
      <Link to="/new-task">
        <button>Crear nueva tarea</button>
      </Link>
      <Link to="/edit-profile">
        <button>Editar perfil</button>
      </Link>
    </>
  );
};

export default Profile;
