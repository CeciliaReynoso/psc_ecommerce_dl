import { useContext, useEffect } from 'react';
import RolesContext from '../context/RolesContext';
import useAuth from '../hooks/useAuth';

const HomePerfil = () => {
  const { user } = useAuth();
  const { cargo, setCargo } = useContext(RolesContext);

  useEffect(() => {
    if (user) {
      const userNombre = localStorage.getItem('userNombre');
      const userRol = localStorage.getItem('userRol');
      const userEmail = localStorage.getItem('userEmail');
      const userDireccion = localStorage.getItem('userDireccion');
      
      setCargo({ nombre: userNombre, rol: userRol, email: userEmail, direccion: userDireccion });
    }
  }, [user, setCargo]);

  return (
    <div>
      <h3>Mi Perfil</h3>
      <p>Datos registrados</p>
      <p>Nombre: {user?.nombre}</p>
      <p>Rol: {user?.rol}</p>
      <p>Dirección: {user?.direccion}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default HomePerfil;