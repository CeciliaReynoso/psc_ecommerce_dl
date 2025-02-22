import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROLES } from '../helpers/roles';
import { useCart } from '../hooks/useCart';
import logoImage from '../../assets/logo.PNG';
import brand1Image from '../../assets/brand1.PNG';
import brand2Image from '../../assets/brand2.PNG';
import brand3Image from '../../assets/brand3.PNG';
import brand4Image from '../../assets/brand4.PNG';
import pawsImage from '../../assets/paws.PNG';
import bagImage from '../../assets/bag.PNG';
import '../Navbar.css';

const Navigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
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

  const renderButtons = () => {
    if (user) {
      if (user.rol === ROLES.CLIENTE) {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
            <button onClick={() => navigate('/')} className='btn home-btn'>Tienda</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn'>Cerrar Sesión</button>
            <div className='cart-container' onClick={() => navigate('/cart')}>
              <img src={bagImage} alt='Carrito de compras' className='cart-icon' /> Total: {formatPrice(totalEnSoles)}
            </div>
          </>
        );
      }
      if (user.rol === ROLES.ADMINISTRADOR) {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
            <button onClick={() => navigate('/admin')} className='btn home-btn'>Administrador</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn'>Cerrar sesión</button>
          </>
        );
      }
      if (user.rol === ROLES.COMPRADOR) {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
            <button onClick={() => navigate('/buyer')} className='btn home-btn'>Comprador</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn'>Cerrar sesión</button>
          </>
        );
      }
      if (user.rol === ROLES.VENDEDOR) {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
            <button onClick={() => navigate('/seller')} className='btn home-btn'>Vendedor</button>
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
          <div className='cart-container' onClick={() => navigate('/cart')}>
            <img src={bagImage} alt='Carrito de compras' className='cart-icon' />
          </div>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logoImage} alt="logo" className="logo" />
        <img src={brand1Image} alt="brand1" className="brand" />
        <img src={brand2Image}alt="brand2" className="brand2" />
        <img src={brand3Image} alt="brand3" className="brand" />
        <img src={brand4Image} alt="brand4" className="brand" />
        <img src={pawsImage} alt="paws" className="paws" />
      </div>
      <div className="opciones">
        {renderButtons()}
      </div>
    </nav>
  );
};

export default Navigation;
