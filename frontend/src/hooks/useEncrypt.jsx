import CryptoJs from 'crypto-js';
import { useState } from 'react';

const VITE_CRYPTOJS_SECRET = import.meta.env.VITE_CRYPTOJS_SECRET;

export const useEncrypt = () => {
  const [encrypted, setEncrypted] = useState(null);
  const [decrypted, setDecrypted] = useState(null);

  const handleEncrypt = (data) => {
    const encryptedData = CryptoJs.AES.encrypt(
      JSON.stringify(data),
      String(VITE_CRYPTOJS_SECRET)
    ).toString();

    setEncrypted(encryptedData);
    return encryptedData;
  };

  const handleDecrypt = (encryptedData) => {
    const bytes = CryptoJs.AES.decrypt(encryptedData, String(VITE_CRYPTOJS_SECRET));
    const decryptedData = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));

    setDecrypted(decryptedData);
    return decryptedData;
  };

  return {
    encrypted,
    decrypted,
    handleEncrypt,
    handleDecrypt,
  };
};