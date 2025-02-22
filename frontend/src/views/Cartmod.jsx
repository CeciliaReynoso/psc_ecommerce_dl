import React, { useEffect } from 'react';
import { useCart } from '../hooks/useCart'; 
import useAuth from '../hooks/useAuth'; 
import '../Cart.css'; 

const Cart = ({ cartZIndex }) => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const { token } = useAuth();

  useEffect(() => {
    const cartContainer = document.querySelector('.cart-container2');
    if (cartContainer) {
      cartContainer.style.zIndex = cartZIndex;
    }
  }, [cartZIndex]);

  const handleCheckout = async () => {
    if (!token) {
      alert("No está autenticado. Inicie sesión para realizar la compra.");
      return;
    }

    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const cartPayload = {
      cart: cart.map(product => ({
        id: product.id_producto,
        name: product.nombre,
        price: product.precio_venta,
        quantity: product.quantity 
      })),
    };

    // console.log("JSON del carrito:", JSON.stringify(cartPayload, null, 2));

    try {
      // Guardar el carrito en sessionStorage
      window.sessionStorage.setItem('checkoutCart', JSON.stringify(cartPayload));
      alert('Checkout realizado con éxito');
      clearCart();
    } catch (error) {
      console.error("Error en el checkout:", error);
      alert('Hubo un problema con el checkout. Inténtelo de nuevo.');
    }
  };

  return (
    <div className="cart-container2">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cart.map((product) => (
              <li key={product.id_producto} className="cart-item">
                <img src={product.imagen_url} alt={product.nombre} className="cart-item-image" />
                <div className="cart-item-details">
                  <span className="cart-item-name">{product.nombre}</span>
                  <span className="cart-item-price">${product.precio_venta}</span>
                  <div className="quantity-controls">
                    <button className="btn btn-outline-dark btn-sm" onClick={() => decreaseQuantity(product.id_producto)}>-</button>
                    <span className="cart-item-quantity">{product.quantity}</span>
                    <button className="btn btn-dark btn-sm" onClick={() => increaseQuantity(product.id_producto)}>+</button>
                  </div>
                  <span className="cart-item-subtotal">Sub-Total: ${product.precio_venta * product.quantity}</span>
                  <button className="btn btn-danger" onClick={() => removeFromCart(product.id_producto)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="cart-total">Total: ${cart.reduce((total, product) => total + product.precio_venta * product.quantity, 0)}</h2>
          <button className="btn btn-primary" onClick={handleCheckout} disabled={!token}>Pagar</button>
        </div>
      )}
    </div>
  );
};

export default Cart;