import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
// import '../../Admin.css';

const NuevoProveedor = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    direccion: '',
    telefono: '',
    email: ''
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
      await axios.post(`${ENDPOINT.proveedores}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/admin/proveedores');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h1>Agregar Nuevo Proveedor</h1>
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
          <button type="submit" className="btn btn-primary">Agregar Proveedor</button>
        </form>
      </div>
    </div>
  );
};

export default NuevoProveedor;