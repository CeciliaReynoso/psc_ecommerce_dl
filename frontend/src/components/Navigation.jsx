import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ROLES } from '../helpers/roles';

const Navigation = ({ total = 0 }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

    // useEffect(() => {
    //     if (user && user.rol? !== 'CLIENTE') {            
    //         navigate('/');
    //     }
    // }, [user, navigate]);
    
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderButtons = () => {
    if (user) {
      if (user.rol === 'CLIENTE') {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn'>Cerrar sesión</button>
            <div className='cart-container' onClick={() => navigate('/cart')}>
              <img src='/assets/Cart.PNG' alt='Carrito de compras' className='cart-icon' /> Total: ${total}
            </div>
          </>
        );
      }
        if  (user.rol === 'ADMINISTRADOR') {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
            <button onClick={() => navigate('/admin')} className='btn home-btn'>Administrador</button>
            <button onClick={() => navigate('/home-perfil')} className='btn profile-btn'>Perfil</button>
            <button onClick={handleLogout} className='btn logout-btn'>Cerrar sesión</button>
          </>
        );
        }
        if  (user.rol === 'COMPRADOR') {
            return (
                <>
                    <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
                    <button onClick={() => navigate('/buyer')} className='btn home-btn'>Comprador</button>
                    <button onClick={() => navigate('/home-perfil')} className='btn profile-btn'>Perfil</button>
                    <button onClick={handleLogout} className='btn logout-btn'>Cerrar sesión</button>
                </>
                );
                }
        if  (user.rol === 'VENDEDOR') {
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
          <div className='cart-container' onClick={() => navigate('/cart')}>
            <img src='/assets/Cart.PNG' alt='Carrito de compras' className='cart-icon' />
          </div>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/assets/Logo.png" alt="logo" className="logo" />
      </div>
      <div className="opciones">
        {renderButtons()}
      </div>
    </nav>
  );
};

export default Navigation;
