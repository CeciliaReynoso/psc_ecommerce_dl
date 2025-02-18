import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
// import '../../Admin.css';

const NuevaSubcategoria = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id_categoria: '',
    nombre: '',
    descripcion: ''
  });
  const [error, setError] = useState(null);

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
      await axios.post(`${ENDPOINT.subcategorias}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/admin/subcategorias');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1>Agregar Nueva Subcategoría</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="id_categoria">ID de Categoría</label>
          <input
            type="number"
            id="id_categoria"
            name="id_categoria"
            value={formData.id_categoria}
            onChange={handleChange}
            required
            className="input-wide"
          />
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
          <button type="submit" className="btn btn-primary">Agregar Subcategoría</button>
        </form>
      </div>
    </div>
  );
};

export default NuevaSubcategoria;