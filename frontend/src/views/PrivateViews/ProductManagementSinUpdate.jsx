// src/views/ProductManagement.jsx
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
    nombre: '',
    descripcion: '',
    precio_venta: '',
    categoria_id: '',
    subcategoria_id: '',
    stock_minimo: '',
    proveedor_id: '',
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
      if (editMode) {
        await axios.put(`${ENDPOINT.productosAdmin}/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post(`${ENDPOINT.productosAdmin}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchProductos();
      setFormData({
        nombre: '',
        descripcion: '',
        precio_venta: '',
        categoria_id: '',
        subcategoria_id: '',
        stock_minimo: '',
        proveedor_id: '',
        imagen_url: ''
      });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleEdit = (producto) => {
    setEditMode(true);
    setEditId(producto.id_producto);
    setFormData({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio_venta: producto.precio_venta,
      categoria_id: producto.categoria_id,
      subcategoria_id: producto.subcategoria_id,
      stock_minimo: producto.stock_minimo,
      proveedor_id: producto.proveedor_id,
      imagen_url: producto.imagen_url
    });
  };

  const handleDelete = async (id_producto) => {
    try {
      await axios.delete(`${ENDPOINT.productosAdmin}/${id_producto}`, {
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
    </div>
  );
};

export default ProductManagement;