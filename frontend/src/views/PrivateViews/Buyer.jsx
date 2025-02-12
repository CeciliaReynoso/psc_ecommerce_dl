import React from 'react';
import { useNavigate } from 'react-router-dom';

const Buyer = () => {
  const navigate = useNavigate();

  return (
    <div className="buyer-container">
      <h1>Gestión de Pedidos a Proveedor</h1>
      <div className="opciones">
        <button onClick={() => navigate('/buyer/orders')} className="btn">Lista de pedidos a proveedor</button>
        <button onClick={() => navigate('/buyer/low-stock-products')} className="btn">Productos con bajo stock</button>
      </div>
    </div>
  );
};

export default Buyer;