// src/views/SupplierOrders.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';
import { ENDPOINT } from '../../config/constans';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const SupplierOrders = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.rol !== 'COMPRADOR') {
      navigate('/no-autorizado');
      return;
    }

      setLoading(false);
    }, [user, token, navigate]);
  
    return (
      <div>
        <h1>Gestión de Pedidos a Proveedor</h1>
        <p>Esta es la vista de gestión de pedidos a proveedor.</p>
      </div>
    );
  };

export default SupplierOrders;