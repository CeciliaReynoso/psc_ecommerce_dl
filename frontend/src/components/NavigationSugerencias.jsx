import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import RolesContext from '../context/RolesContext';
import { ROLES } from '../helpers/roles';

const Navigation = () => {
  const navigate = useNavigate();
  const { session, logout } = useAuth();
  const { cargo, setCargo } = useContext(RolesContext);

  const handleLogout = () => {
    logout();
    setCargo(null);
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('email');
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        {!session?.token && (
          <>
            <li><Link to="/login">Inicio de sesión</Link></li>
            <li><Link to="/register">Registro</Link></li>
          </>
        )}
        {session?.token && (
          <>
            <li><Link to="/profile">Mi perfil</Link></li>
            <li><Link to="/cart">Carrito de compras</Link></li>
            <li><Link to="/create-post">Crear Publicación</Link></li>
            <li><Link to="/post-gallery">Galería de Publicaciones</Link></li>
            <li><Link to="/post-detail">Detalle de Publicación</Link></li>
            {cargo === ROLES.ADMIN && (
              <>
                <li><Link to="/admin">Administración de Usuarios</Link></li>
                <li><Link to="/admin/products">Administración de Productos</Link></li>
                <li><Link to="/admin/categories">Administración de Categorías</Link></li>
              </>
            )}
            {cargo === ROLES.COMPRADOR && (
              <>
                <li><Link to="/buyer">Gestión de Pedidos a Proveedor</Link></li>
                <li><Link to="/buyer/low-stock-products">Listado de Productos con Stock Mínimo</Link></li>
              </>
            )}
            {cargo === ROLES.VENDEDOR && (
              <>
                <li><Link to="/seller">Gestión de Pedidos de Cliente</Link></li>
                <li><Link to="/seller/incomplete-orders">Listado de Pedidos No Completados</Link></li>
              </>
            )}
            <li><button onClick={handleLogout}>Cerrar sesión</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;