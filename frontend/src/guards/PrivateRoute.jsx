import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  const userRol = user?.rol;

  return user ? children : <Navigate to="/login" />;

  if (!userRol) {
    // Si no hay rol, redirigir al login
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(userRol)) {
    // Si los roles no coinciden, redirigir a no autorizado
    return <Navigate to="/no-autorizado" />;
  }

  if (allowedRoles.includes(userRol)) {
    // Si los roles coinciden, mostrar el contenido
    return <Navigate to="/admin/users" />;
  }
  return children;
};

export default PrivateRoute;