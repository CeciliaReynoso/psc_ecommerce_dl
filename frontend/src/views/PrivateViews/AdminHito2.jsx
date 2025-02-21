import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h1>Administración</h1>
      <div className="opciones">
        <button onClick={() => navigate('/admin/users')} className="btn">Administración de Usuarios</button>
        <button onClick={() => navigate('/admin/products')} className="btn">Administración de Productos</button>
        <button onClick={() => navigate('/admin/categories')} className="btn">Administración de Categorías</button>
        <button onClick={() => navigate('/admin/create-post')} className="btn">Crear Publicación</button>
        <button onClick={() => navigate('/admin/gallery')} className="btn">Galería de Publicaciones</button>
      </div>
    </div>
  );
};

export default Admin;