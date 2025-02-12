import { createContext, useEffect, useState } from 'react';
import { useStorage } from '../hooks/useStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { handleSetStorageSession, handleGetStorageSession, decrypted } = useStorage();
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSession = (session) => {
    setSession(session);
    handleSetStorageSession(session);
  };

  useEffect(() => {
    handleGetStorageSession();
  }, []); // Asegurarse de que este useEffect solo se ejecute una vez al montar el componente

  useEffect(() => {
    if (decrypted) {
      try {
        const parsedSession = JSON.parse(decrypted);
        setSession(parsedSession);
      } catch (error) {
        console.error('Error al parsear la sesión desencriptada:', error);
      }
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1);
  }, [decrypted]); // Este useEffect se ejecutará cuando 'decrypted' cambie

  return (
    <AuthContext.Provider value={{ session, isLoading, handleSession }}>
      {children}
    </AuthContext.Provider>
  );
};