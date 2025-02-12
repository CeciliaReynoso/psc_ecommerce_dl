import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.rol !== 'ADMINISTRADOR') {
      navigate('/no-autorizado');
      return;
    }

    const fetchUsuarios = async () => {
      try {
        if (token) {
          const response = await axios.get(ENDPOINT.users, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log('Datos de usuarios:', response.data); // Verificar los datos recibidos
          setUsuarios(response.data);
        } else {
          setError('Token no encontrado');
        }
      } catch (error) {
        setError('Error al obtener usuarios');
        console.error('Error al obtener los usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, [user, token, navigate]);

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No se encontraron usuarios</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;