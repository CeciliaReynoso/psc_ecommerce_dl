import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Seller = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

        useEffect(() => {
          if (!user) {
            return;
          }
      
          if (user.rol !== 'VENDEDOR') {
            navigate('/no-autorizado');
            return;
          }
        }, [user, navigate]);
  

  return (
    <div className="seller-container">
      <h1>Gestión de Pedidos de Clientes</h1>
      <div className="opciones">
        <button onClick={() => navigate('/seller/orders')} className="btn">Lista de pedidos de clientes</button>
        <button onClick={() => navigate('/seller/incomplete-orders')} className="btn">Pedidos incompletos</button>
      </div>
    </div>
  );
};

export default Seller;