import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import RolesContext from '../context/RolesContext';

const Navigation = ({total = 0}) => {
  const navigate = useNavigate();
  // Revisar si el dato de usuario y cargo se sincronizan entre el hook y el contexto
  const { user, logout } = useAuth();
  const { cargo } = useContext(RolesContext);

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
            <button onClick={() => navigate('/cart')} className='btn cart-btn'> 🛒 Total: ${total}</button>
          </>
        );
      } else {
        return (
          <>
            <button onClick={() => navigate('/')} className='btn home-btn'>Inicio</button>
            <button onClick={() => navigate('/')} className='btn home-btn'>Intranet</button>
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
          <button onClick={() => navigate('/cart')} className='btn cart-btn'> <img src='/assets/Cart.PNG' alt='Pets Wellness' /> </button>
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