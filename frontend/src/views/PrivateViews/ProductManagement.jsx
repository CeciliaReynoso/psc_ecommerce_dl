import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
// import '../../Admin.css';

const ProductManagement = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    precio_venta: '',
    stock_minimo: '',
    imagen_url: ''
  });
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

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

  useEffect(() => {
    if (!loading) {
      fetchProductos();
    }
  }, [loading, token]);

  const fetchProductos = async () => {
    try {
      const response = await axios.get(`${ENDPOINT.productosAdmin}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductos(response.data);
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
      await axios.put(`${ENDPOINT.productoAdmin.replace(':id', editId)}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProductos();
      setFormData({
        precio_venta: '',
        stock_minimo: '',
        imagen_url: ''
      });
      setEditMode(false);
      setEditId(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleEdit = (producto) => {
    setEditMode(true);
    setEditId(producto.id_producto);
    setFormData({
      precio_venta: producto.precio_venta,
      stock_minimo: producto.stock_minimo,
      imagen_url: producto.imagen_url
    });
  };

  const handleDelete = async (id_producto) => {
    try {
      await axios.delete(`${ENDPOINT.productoAdmin.replace(':id', id_producto)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProductos();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="admin-container">
      <h1>Gestionar Productos</h1>
      {error && <p className="error">{error}</p>}
      <button onClick={() => navigate('/admin/products/nuevo')} className="btn btn-primary">Agregar Nuevo Producto</button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio de Venta</th>
            <th>Stock Actual</th>
            <th>Stock Mínimo</th>
            <th>ID de Categoría</th>
            <th>ID de Subcategoría</th>
            <th>ID de Proveedor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto}>
              <td>{producto.id_producto}</td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio_venta}</td>
              <td>{producto.stock_actual}</td>
              <td>{producto.stock_minimo}</td>
              <td>{producto.categoria_id}</td>
              <td>{producto.subcategoria_id}</td>
              <td>{producto.proveedor_id}</td>
              <td>
                <button onClick={() => handleEdit(producto)} >Editar</button>
                <button onClick={() => handleDelete(producto.id_producto)} >Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editMode && (
        <form onSubmit={handleSubmit}>
          <h2>Editar Producto</h2>
          <div className="form-group">
            <label htmlFor="precio_venta">Precio de Venta</label>
            <input
              type="number"
              id="precio_venta"
              name="precio_venta"
              value={formData.precio_venta}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock_minimo">Stock Mínimo</label>
            <input
              type="number"
              id="stock_minimo"
              name="stock_minimo"
              value={formData.stock_minimo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imagen_url">URL de la Imagen</label>
            <input
              type="text"
              id="imagen_url"
              name="imagen_url"
              value={formData.imagen_url}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </form>
      )}
    </div>
  );
};

export default ProductManagement;