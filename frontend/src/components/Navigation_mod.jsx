import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROLES } from '../helpers/roles';
import { useCart } from '../hooks/useCart';
import Cart from '../views/Cart';
import '../Navbar.css';

const Navigation = ({ setCartZIndex }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [showCart, setShowCart] = useState(false); 

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCartClick = () => {
    setCartZIndex(1060);
    setShowCart(!showCart);
    navigate('/cart');
  };

  // Calcular el total en soles del carrito
  const totalEnSoles = cart.reduce((total, product) => total + product.precio_venta, 0);

  const renderButtons = () => {
    if (user) {
      if (user.rol === 'CLIENTE') {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
            <button onClick={() => navigate('/')} className='btn home-btn'>Tienda</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn'>Cerrar Sesión</button>
            <div className='cart-container' onClick={handleCartClick}>
              <img src='/assets/bag.PNG' alt='Carrito de compras' className='cart-icon' /> Total: S/{totalEnSoles.toFixed(2)}
            </div>
          </>
        );
      }
      if (user.rol === 'ADMINISTRADOR') {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
            <button onClick={() => navigate('/admin')} className='btn home-btn'>Administrador</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn'>Cerrar sesión</button>
          </>
        );
      }
      if (user.rol === 'COMPRADOR') {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
            <button onClick={() => navigate('/buyer')} className='btn home-btn'>Comprador</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn'>Cerrar sesión</button>
          </>
        );
      }
      if (user.rol === 'VENDEDOR') {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
            <button onClick={() => navigate('/')} className='btn home-btn'>Vendedor</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn'>Cerrar sesión</button>
          </>
        );
      }
    } else {
      return (
        <>
          <button onClick={() => navigate('/login')} className='btn login-btn'>Iniciar sesión</button>
          <button onClick={() => navigate('/register')} className='btn register-btn'>Registrarse</button>
          <div className='cart-container' onClick={handleCartClick}>
            <img src='/assets/bag.PNG' alt='Carrito de compras' className='cart-icon' />
          </div>
        </>
      );
    }
  };

  return (
   <>
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/assets/Logo.png" alt="logo" className="logo" />
        <img src="/assets/brand1.PNG" alt="brand1" className="brand" />
        <img src="/assets/brand2.PNG" alt="brand2" className="brand2" />
        <img src="/assets/brand3.PNG" alt="brand3" className="brand" />
        <img src="/assets/brand4.PNG" alt="brand4" className="brand" />
        <img src="/assets/paws.PNG" alt="paws" className="paws" />
      </div>
      <div className="opciones">
        {renderButtons()}
      </div>
    </nav>
    
  </>
  );
};

export default Navigation;