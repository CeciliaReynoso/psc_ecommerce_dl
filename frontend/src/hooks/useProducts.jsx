import { useContext } from 'react';
import { ProductContext } from '../context/ProductProvider'; // Asegúrate de que la ruta sea correcta

export const useProducts = () => {
  return useContext(ProductContext);
};