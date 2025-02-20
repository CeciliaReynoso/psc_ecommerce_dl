import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RolesContext from '../../context/RolesContext';
import useAuth from '../../hooks/useAuth';

const Buyer = () => {
  const { setCargo } = useContext(RolesContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const userNombre = localStorage.getItem('userNombre');
    const userRol = localStorage.getItem('userRol');

    if (userNombre && userRol) {
      setCargo({ nombre: userNombre, rol: userRol });
    }
  }, [setCargo]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.rol !== 'COMPRADOR') {
      navigate('/no-autorizado');
      return;
    }
  }, [user, navigate]);


  return (
    <div className="buyer-container">
      <h1>Gestión de Pedidos a Proveedor</h1>
      <div className="opciones">
        <button onClick={() => navigate('/buyer/orders')} className="btn">Lista de pedidos a proveedor</button>
        <button onClick={() => navigate('/buyer/low-stock-products')} className="btn">Productos con bajo stock</button>
        <button onClick={() => navigate('/buyer/proveedores')} className="btn">Gestionar Proveedores</button>
        <button onClick={() => navigate('/buyer/subcategorias')} className="btn">Gestionar Subcategorías</button>
      </div>
    </div>
  );
};

export default Buyer;