import { useContext, useEffect } from 'react';
import RolesContext from '../context/RolesContext';
import useAuth from '../hooks/useAuth';
import Footer from '../components/Footer';

const Profile = () => {
  const { setCargo } = useContext(RolesContext);
  const { user } = useAuth();

  useEffect(() => {
    const userNombre = localStorage.getItem('userNombre');
    const userRol = localStorage.getItem('userRol');

    if (userNombre && userRol) {
      setCargo({ nombre: userNombre, rol: userRol });
    }
  }, [setCargo]);

  return (
    <div className="app-container">
      <div>
        <h1>Tu Perfil</h1>
        {user ? (
          user.rol === 'cliente' ? (
            <p>Bienvenido {user.nombre}</p>
          ) : (
            <p>Hola, {user.nombre}. Has iniciado sesion como: {user.rol}</p>
          )
        ) : (
          <p>Inicia sesión o registrate</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;