import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Proveedores = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [proveedores, setProveedores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editMode) {
        await axios.put(`${ENDPOINT.proveedores}/${editId}`, {
          nombre,
          contacto,
          direccion,
          telefono,
          email,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEditMode(false);
        setEditId(null);
      } else {
        await axios.post(`${ENDPOINT.proveedores}`, {
          nombre,
          contacto,
          direccion,
          telefono,
          email,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchProveedores();
      setNombre('');
      setContacto('');
      setDireccion('');
      setTelefono('');
      setEmail('');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleEdit = (proveedor) => {
    setEditMode(true);
    setEditId(proveedor.id_proveedor);
    setNombre(proveedor.nombre);
    setContacto(proveedor.contacto);
    setDireccion(proveedor.direccion);
    setTelefono(proveedor.telefono);
    setEmail(proveedor.email);
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
    <div>
      <h1>Gestionar Proveedores</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="text" placeholder="Contacto" value={contacto} onChange={(e) => setContacto(e.target.value)} required />
        <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
        <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">{editMode ? 'Actualizar Proveedor' : 'Agregar Proveedor'}</button>
      </form>
      {error && <p>{error}</p>}
      <table>
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
                <button onClick={() => handleEdit(proveedor)}>Editar</button>
                <button onClick={() => handleDelete(proveedor.id_proveedor)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Proveedores;