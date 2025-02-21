import React from 'react';
import { useCart } from '../hooks/useCart'; // Asegúrate de que la ruta sea correcta
import useAuth from '../hooks/useAuth'; // Asegúrate de que la ruta sea correcta

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const { token } = useAuth();

  const handleCheckout = () => {
    // Simulación del checkout
    alert('Checkout simulado');
    clearCart();
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul>
            {cart.map((product) => (
              <li key={product.id_producto}>
                <img src={product.imagen_url} alt={product.nombre} width="50" />
                <span>{product.nombre}</span>
                <span>${product.precio_venta}</span>
                <button onClick={() => removeFromCart(product.id_producto)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <h2>Total: ${cart.reduce((total, product) => total + product.precio_venta, 0)}</h2>
          <button onClick={handleCheckout} disabled={!token}>Pagar</button>
        </div>
      )}
    </div>
  );
};

export default Cart;