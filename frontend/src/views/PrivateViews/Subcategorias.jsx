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
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria_id: ''
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${ENDPOINT.subcategorias}/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post(`${ENDPOINT.subcategorias}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchSubcategorias();
      setFormData({
        nombre: '',
        descripcion: '',
        categoria_id: ''
      });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleEdit = (subcategoria) => {
    setEditMode(true);
    setEditId(subcategoria.id_subcategoria);
    setFormData({
      nombre: subcategoria.nombre,
      descripcion: subcategoria.descripcion,
      categoria_id: subcategoria.id_categoria
    });
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
      <button onClick={() => navigate('/admin/subcategorias/nueva')} className="btn btn-primary">Agregar Nueva Subcategoría</button>
      <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="input-wide"
        />
        <label htmlFor="descripcion">Descripción</label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
          className="input-wide"
        />
        <button type="submit" className="btn btn-primary">{'Actualizar Subcategoría'}</button>
      </form>
      </div>
      <table className="table ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {subcategorias.map((subcategoria) => (
            <tr key={subcategoria.id_subcategoria}>
              <td>{subcategoria.id_subcategoria}</td>
              <td>{subcategoria.nombre}</td>
              <td>{subcategoria.descripcion}</td>
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