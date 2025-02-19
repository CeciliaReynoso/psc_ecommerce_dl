import { useContext, useEffect } from 'react';
import RolesContext from '../context/RolesContext';
import useAuth from '../hooks/useAuth';

const HomePerfil = () => {
  const { user } = useAuth();
  const { cargo, setCargo } = useContext(RolesContext);

  useEffect(() => {
    const userNombre = localStorage.getItem('userNombre');
    const userRol = localStorage.getItem('userRol');
    const userEmail = localStorage.getItem('userEmail');
    const userDireccion = localStorage.getItem('userDireccion');
    
 
    setCargo({ nombre: userNombre, rol: userRol, email: userEmail, direccion: userDireccion });
    
  }, [setCargo]);

  return (

    <div>
        <h1>
          Mi Perfil 
        </h1>
        <p>Datos registrados</p>
        <p>Nombre: {cargo?.nombre}</p>
        <p>Rol: {cargo?.rol}</p>
        <p>Dirección: {cargo?.direccion}</p>
        <p>Email: {cargo?.email}</p>
    </div>

  
    
  );
};

export default HomePerfil;