    import React, { useEffect, useState } from 'react';
  import axios from '../../config/axiosConfig';
  import { ENDPOINT } from '../../config/constans';
  import useAuth from '../../hooks/useAuth';
  import { useNavigate } from 'react-router-dom';
  // import '../../Admin.css';
  
  const Proveedores = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [proveedores, setProveedores] = useState([]);
    const [formData, setFormData] = useState({
      nombre: '',
      contacto: '',
      direccion: '',
      telefono: '',
      email: ''
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
        fetchProveedores();
      }
    }, [loading, token]);
  
    const fetchProveedores = async () => {
      try {
        const response = await axios.get(`${ENDPOINT.proveedores}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProveedores(response.data);
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
          await axios.put(`${ENDPOINT.proveedores}/${editId}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setEditMode(false);
          setEditId(null);
        } else {
          await axios.post(`${ENDPOINT.proveedores}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }
        fetchProveedores();
        setFormData({
          nombre: '',
          contacto: '',
          direccion: '',
          telefono: '',
          email: ''
        });
      } catch (error) {
        setError(error.response.data.message);
      }
    };
  
    const handleEdit = (proveedor) => {
      setEditMode(true);
      setEditId(proveedor.id_proveedor);
      setFormData({
        nombre: proveedor.nombre,
        contacto: proveedor.contacto,
        direccion: proveedor.direccion,
        telefono: proveedor.telefono,
        email: proveedor.email
      });
    };
  
    const handleDelete = async (id_proveedor) => {
      try {
        await axios.delete(`${ENDPOINT.proveedores}/${id_proveedor}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchProveedores();
      } catch (error) {
        setError(error.response.data.message);
      }
    };
  
    return (
      <div className="admin-container">
        <h1>Gestionar Proveedores</h1>
        {error && <p className="error">{error}</p>}
        <button onClick={() => navigate('/admin/proveedores/nuevo')} className="btn btn-primary">Agregar Nuevo Proveedor</button>
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
          <label htmlFor="contacto">Contacto</label>
          <input
            type="text"
            id="contacto"
            name="contacto"
            value={formData.contacto}
            onChange={handleChange}
            required
            className="input-wide"
          />
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
            className="input-wide"
          />
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            className="input-wide"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-wide"
          />
          <button type="submit" className="btn btn-primary">{'Actualizar Proveedor'}</button>
        </form>
        <table className="table ">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Contacto</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.id_proveedor}>
                <td>{proveedor.id_proveedor}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.contacto}</td>
                <td>{proveedor.direccion}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.email}</td>
                <td>
                  <button onClick={() => handleEdit(proveedor)} className="btn btn-secondary">Editar</button>
                  <button onClick={() => handleDelete(proveedor.id_proveedor)} className="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Proveedores;