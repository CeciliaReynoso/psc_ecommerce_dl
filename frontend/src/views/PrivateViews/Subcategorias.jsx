import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../../Admin.css'; // Importar los estilos de Admin.css

const Subcategorias = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subcategorias, setSubcategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.rol !== 'COMPRADOR' && user.rol !== 'ADMINISTRADOR') {
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
      if (editMode) {
        await axios.put(`${ENDPOINT.subcategorias}/${editId}`, {
          nombre,
          descripcion,
          categoria_id: categoriaId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post(`${ENDPOINT.subcategorias}`, {
          nombre,
          descripcion,
          categoria_id: categoriaId,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchSubcategorias();
      setNombre('');
      setDescripcion('');
      setCategoriaId('');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleEdit = (subcategoria) => {
    setEditMode(true);
    setEditId(subcategoria.id_subcategoria);
    setNombre(subcategoria.nombre);
    setDescripcion(subcategoria.descripcion);
    setCategoriaId(subcategoria.id_categoria);
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
    <div className="admin-container">
      <h1>Gestionar Subcategorías</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="input-wide"
          title={nombre}
        />
        <label htmlFor="descripcion">Descripción</label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          className="input-wide"
          title={descripcion}
        />
        <label htmlFor="categoriaId">ID de Categoría</label>
        <input
          type="text"
          id="categoriaId"
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
          className="input-wide"
          title={categoriaId}
        />
        <button type="submit" className="btn btn-primary">{editMode ? 'Actualizar Subcategoría' : 'Agregar Subcategoría'}</button>
      </form>
      <table className="table table-striped">
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
                <button onClick={() => handleEdit(subcategoria)} className="btn btn-secondary">Editar</button>
                <button onClick={() => handleDelete(subcategoria.id_subcategoria)} className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Subcategorias;