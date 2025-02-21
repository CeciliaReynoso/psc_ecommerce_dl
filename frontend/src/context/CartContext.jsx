import { createContext, useState } from 'react';

// Crea el contexto
export const CartContext = createContext();

// Crea un proveedor para el contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const clearCart = () => {
    setCart([]);  // Vaciamos el carrito estableciendo un array vacío
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const productInCart = prevCart.find(item => item.id_producto === product.id_producto);
      if (productInCart) {
        return prevCart.map(item =>
          item.id_producto === product.id_producto
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleIncreaseQuantity = (id) => {
    setCart(prevCart => prevCart.map(product =>
      product.id_producto === id ? { ...product, quantity: product.quantity + 1 } : product
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setCart(prevCart => prevCart
      .map(product =>
        product.id_producto === id
          ? { ...product, quantity: Math.max(product.quantity - 1, 0) }
          : product
      )
      .filter(product => product.quantity > 0)
    );
  };

  const getTotal = () => {
    return cart.reduce((total, product) => total + (product.precio_venta * product.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        getTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
