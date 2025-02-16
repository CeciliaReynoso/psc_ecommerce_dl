import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Subcategorias = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subcategorias, setSubcategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.rol !== 'COMPRADOR') {
      navigate('/no-autorizado');
      return;
    }

    setLoading(false);
  }, [user, token, navigate]);

  useEffect(() => {
    if (!loading) {
      fetchSubcategorias();
    }
  }, [loading, token]);

  const fetchSubcategorias = async () => {
    try {
      const response = await axios.get(`${ENDPOINT.subcategorias}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubcategorias(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${ENDPOINT.subcategorias}`, {
        nombre,
        descripcion,
        categoria_id: categoriaId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSubcategorias();
      setNombre('');
      setDescripcion('');
      setCategoriaId('');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleDelete = async (id_subcategoria) => {
    try {
      await axios.delete(`${ENDPOINT.subcategorias}/${id_subcategoria}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchSubcategorias();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Gestionar Subcategorías</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        <input type="text" placeholder="ID de Categoría" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required />
        <button type="submit">Agregar Subcategoría</button>
      </form>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>ID de Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {subcategorias.map((subcategoria) => (
            <tr key={subcategoria.id_subcategoria}>
              <td>{subcategoria.id_subcategoria}</td>
              <td>{subcategoria.nombre}</td>
              <td>{subcategoria.descripcion}</td>
              <td>{subcategoria.id_categoria}</td>
              <td>
                <button onClick={() => handleDelete(subcategoria.id_subcategoria)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subcategorias;