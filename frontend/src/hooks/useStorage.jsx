import { useEffect, useState } from 'react';
import { useEncrypt } from './useEncrypt';

export const useStorage = () => {
  const { handleEncrypt, handleDecrypt } = useEncrypt();
  const [decrypted, setDecrypted] = useState(null);

  const handleSetStorageSession = (session) => {
    const encryptedSession = handleEncrypt(session);
    localStorage.setItem('USER_SESSION', encryptedSession);
  };

  const handleGetStorageSession = () => {
    const encryptedSession = localStorage.getItem('USER_SESSION');

    if (encryptedSession) {
      const decryptedSession = handleDecrypt(encryptedSession);
      setDecrypted(decryptedSession);
    }
  };

  const handleClearStorageSession = () => {
    localStorage.removeItem('USER_SESSION');
    setDecrypted(null);
  };

  useEffect(() => {
    handleGetStorageSession();
  }, []);

  return {
    decrypted,
    handleSetStorageSession,
    handleGetStorageSession,
    handleClearStorageSession,
  };
};