import React from 'react';
import { useNavigate } from 'react-router-dom';

const Seller = () => {
  const navigate = useNavigate();

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