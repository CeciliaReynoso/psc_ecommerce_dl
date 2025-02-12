import { createContext, useState, useEffect,  } from 'react';
import useAuth from '../hooks/useAuth';

const RolesContext = createContext();

export const RolesProvider = ({ children }) => {
  const { user } = useAuth();
  const [cargo, setCargo] = useState(null);

  useEffect(() => {
    if (user) {
      setCargo({
        nombre: user.nombre,
        rol: user.rol,
        email: user.email,
        direccion: user.direccion,
      });
    } else {
      setCargo(null);
    }
  }, [user]);

  return (
    <RolesContext.Provider value={{ cargo, setCargo }}>
      {children}
    </RolesContext.Provider>
  );
};

export default RolesContext;