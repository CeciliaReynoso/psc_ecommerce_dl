import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/axiosConfig'; // Importar la instancia de axiosConfig
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';

const EditUserForm = () => {
  const { token, user } = useAuth(); // Obtener el token y el usuario logueado (administrador)
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nombre: '',
    direccion: '',
    rol: '',
    email: ''
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.rol !== 'ADMINISTRADOR') {
      navigate('/no-autorizado');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${ENDPOINT.users}/${id}`, {
          headers: { Authorization: `Bearer ${token}` } // Usar el token del administrador
        });
        const data = response.data;
        setUserData({
          nombre: data.nombre,
          direccion: data.direccion,
          rol: data.rol,
          email: data.email
        });
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, [id, token, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${ENDPOINT.users}/${id}`, {
        nombre: userData.nombre,
        direccion: userData.direccion,
        rol: userData.rol
      }, {
        headers: { Authorization: `Bearer ${token}` } // Usar el token del administrador
      });
      navigate('/admin/users');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  if (!userData.nombre) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <div className="form-container">
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <p>{userData.email}</p>

        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={userData.nombre}
          onChange={handleChange}
        />

        <label>Dirección</label>
        <input
          type="text"
          name="direccion"
          value={userData.direccion}
          onChange={handleChange}
        />

        <label>Asignar Nuevo Rol</label>
        <select
          name="rol"
          value={userData.rol}
          onChange={handleChange}
        >
          <option value="CLIENTE">CLIENTE</option>
          <option value="ADMINISTRADOR">ADMINISTRADOR</option>
          <option value="COMPRADOR">COMPRADOR</option>
          <option value="VENDEDOR">VENDEDOR</option>
        </select>

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditUserForm;