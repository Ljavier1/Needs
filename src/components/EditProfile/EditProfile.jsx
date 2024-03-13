import React, { useContext, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './EditProfile.css';

const EditProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !bio) {
      return toast.error('Debes completar todos los campos.');
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('avatar', avatar);

    try {
      await updateUser(formData);
      toast.success('Perfil actualizado correctamente.');
      // Redirigir al perfil del usuario
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Error al actualizar el perfil.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  return (
    <div className="edit-profile">
      {user && (
        <>
          <h2>Editar perfil</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="bio">Biografía</label>
            <textarea
              id="bio"
              name="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <label htmlFor="avatar">Avatar (opcional)</label>
            <input type="file" id="avatar" name="avatar" onChange={handleAvatarChange} />

            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar cambios'}
            </button>

            {error && <p className="error-message">{error}</p>}
          </form>
        </>
      )}
      {!user && <Redirect to="/login" />}
    </div>
  );
};

export default EditProfile;
