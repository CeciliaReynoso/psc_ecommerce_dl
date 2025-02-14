import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/axiosConfig'; // Importar la instancia de axiosConfig
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';

const EditUserForm = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${ENDPOINT.users}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const userData = response.data;
        setUser(userData);
        setNombre(userData.nombre);
        setDireccion(userData.direccion);
        setRol(userData.rol);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, [id, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${ENDPOINT.editUser}/${id}`, { nombre, direccion, rol }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/user-management');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <div className="form-container">
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" value={user.email} readOnly />

        <label>Password</label>
        <input type="text" value="********" readOnly />

        <label>Nombre</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

        <label>Dirección</label>
        <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />

        <label>Rol</label>
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
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