import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RolesContext from '../../context/RolesContext';
import useAuth from '../../hooks/useAuth';

const Admin = () => {
  const { setCargo } = useContext(RolesContext);
  const { token, user } = useAuth();
  const navigate = useNavigate();

    useEffect(() => {
      const userNombre = localStorage.getItem('userNombre');
      const userRol = localStorage.getItem('userRol');
  
      if (userNombre && userRol) {
        setCargo({ nombre: userNombre, rol: userRol });
      }
    }, [setCargo]);

      useEffect(() => {
        if (!user) {
          return;
        }
    
        if (user.rol !== 'ADMINISTRADOR') {
          navigate('/no-autorizado');
          return;
        }
      }, [user, navigate]);

  return (
    <div className="admin-container">
      <h1>Administración</h1>
      <div className="opciones">
        <button onClick={() => navigate('/admin/users')} className="btn">Administración de Usuarios</button>
        <button onClick={() => navigate('/admin/products')} className="btn">Administración de Productos</button>
        <button onClick={() => navigate('/admin/subcategorias')} className="btn">Administración de Subcategorías</button>
        <button onClick={() => navigate('/admin/proveedores')} className="btn">Administración de Proveedores</button>
      </div>
    </div>
  );
  };

export default Admin;