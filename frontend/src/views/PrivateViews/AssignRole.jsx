import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, assignRole } from '../../config/api';
import useAuth from '../../hooks/useAuth';

const AssignRole = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id, token);
        setUser(userData);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchUser();
  }, [id, token]);

  const handleRoleChange = (event) => {
    setNewRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await assignRole({ id, rol: newRole }, token);
      navigate('/user-management');
    } catch (error) {
      console.error('Error al asignar rol:', error);
    }
  };

  if (!user) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <div className="form-container">
      <h2>Asignar Rol</h2>
      <form onSubmit={handleSubmit}>
        <label>ID</label>
        <p>{user.id}</p>

        <label>Nombre</label>
        <p>{user.nombre}</p>

        <label>Email</label>
        <p>{user.email}</p>

        <label>Rol Actual</label>
        <p>{user.rol}</p>

        <label>Nuevo Rol</label>
        <select value={newRole} onChange={handleRoleChange}>
          <option value="">Seleccione un rol</option>
          <option value="ADMINISTRADOR">ADMINISTRADOR</option>
          <option value="COMPRADOR">COMPRADOR</option>
          <option value="VENDEDOR">VENDEDOR</option>
        </select>

        <button type="submit">Asignar Rol</button>
      </form>
    </div>
  );
};

export default AssignRole;