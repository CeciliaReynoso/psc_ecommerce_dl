import { createContext, useState } from 'react';

// Crea el contexto
export const CartContext = createContext();

// Crea un proveedor para el contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const clearCart = () => {
    setCart([]);  // Vaciamos el carrito estableciendo un array vacío
  };
  
  const handleAddToCart = (producto) => {
    setCart(prevCart => {
      const productoInCart = prevCart.find(item => item.id === producto.id);
      if (productoInCart) {
        return prevCart.map(item =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...producto, quantity: 1 }];
      }
    });
  };

  const handleIncreaseQuantity = (id) => {
    setCart(prevCart => prevCart.map(producto =>
      producto.id === id ? { ...producto, quantity: producto.quantity + 1 } : producto
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setCart(prevCart => prevCart
      .map(producto =>
        producto.id === id
          ? { ...producto, quantity: Math.max(producto.quantity - 1, 0) }
          : producto
      )
      .filter(producto => producto.quantity > 0)
    );
  };

  const getTotal = () => {
    return cart.reduce((total, producto) => total + (producto.price * producto.quantity), 0);
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
