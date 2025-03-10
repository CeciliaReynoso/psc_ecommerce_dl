import React, { useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom'; // Importar Link
import { useCart } from '../hooks/useCart'; 
import useAuth from '../hooks/useAuth'; 
import '../Cart.css'; 


const Cart = ({ cartZIndex }) => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
        return;
    }

    if (user.rol !== 'CLIENTE') {
      navigate('/no-autorizado');
      return;
    }
  }, [user, navigate]);

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

  // Función para formatear el precio en soles peruanos
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(price);
  };

  // Calcular el total en soles del carrito
  const totalEnSoles = cart.reduce((total, product) => {
    const precio = parseFloat(product.precio_venta);
    const cantidad = parseInt(product.quantity, 10);

    
    return total + (isNaN(precio) || isNaN(cantidad) ? 0 : precio * cantidad);
  }, 0);

  const Regresar = () => {
    return (
      <div style={{ textAlign: 'center', marginBottom:'10px',marginTop: '25px' }}>
        <Link to="/">Volver a la Página Principal</Link>
      </div>
    );
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
                  <span className="cart-item-price">{formatPrice(parseFloat(product.precio_venta))}</span>
                  <div className="quantity-controls">
                    <button className="btn btn-outline-dark btn-sm" onClick={() => decreaseQuantity(product.id_producto)}>-</button>
                    <span className="cart-item-quantity">{product.quantity}</span>
                    <button className="btn btn-dark btn-sm" onClick={() => increaseQuantity(product.id_producto)}>+</button>
                    <span><button className="btn btn-dark btn-sm" onClick={() => removeFromCart(product.id_producto)}>Eliminar</button></span>
                  </div>
                  <span className="cart-item-subtotal">Sub-Total: {formatPrice(parseFloat(product.precio_venta) * parseInt(product.quantity, 10))}</span>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="cart-total">Total: {formatPrice(totalEnSoles)}</h2>
          <button className="btn btn-pay" onClick={handleCheckout} disabled={!token}>Pagar</button>
          <Regresar /> {/* Usar el componente Regresar */}
        </div>
      )}
    </div>
  );
};

export default Cart;