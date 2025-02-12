import { useContext } from 'react';
import { CartContext } from '../context/CartProvider'; // Asegúrate de que la ruta sea correcta

export const useCart = () => {
  return useContext(CartContext);
};