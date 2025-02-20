import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const NuevoProducto = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio_venta: '',
    categoria_id: '',
    subcategoria_id: '',
    stock_minimo: 0, // Establecer stock_minimo a 0
    proveedor_id: '',
    imagen_url: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.rol !== 'ADMINISTRADOR') {
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
      await axios.post(`${ENDPOINT.productosAdmin}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/admin/products');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1>Agregar Nuevo Producto</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="form">
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
          <label htmlFor="precio_venta">Precio de Venta</label>
          <input
            type="number"
            id="precio_venta"
            name="precio_venta"
            value={formData.precio_venta}
            onChange={handleChange}
            required
            className="input-wide"
          />
          <label htmlFor="categoria_id">ID de Categoría</label>
          <input
            type="text"
            id="categoria_id"
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
            required
            className="input-wide"
          />
          <label htmlFor="subcategoria_id">ID de Subcategoría</label>
          <input
            type="text"
            id="subcategoria_id"
            name="subcategoria_id"
            value={formData.subcategoria_id}
            onChange={handleChange}
            required
            className="input-wide"
          />
          <label htmlFor="proveedor_id">ID de Proveedor</label>
          <input
            type="text"
            id="proveedor_id"
            name="proveedor_id"
            value={formData.proveedor_id}
            onChange={handleChange}
            required
            className="input-wide"
          />
          <label htmlFor="imagen_url">URL de la Imagen</label>
          <input
            type="text"
            id="imagen_url"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
            className="input-wide"
          />
          <button type="submit" className="btn btn-primary">Agregar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default NuevoProducto;