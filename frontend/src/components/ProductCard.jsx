import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart'; // Asegúrate de que la ruta sea correcta

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card mb-4">
      <img src={product.imagen_url} alt={product.nombre} className="card-img-top" />
      <div className="card-body">
        <h3 className="card-title">{product.nombre}</h3>
        <p className="card-text">{product.descripcion}</p>
        <p className="card-text">Precio: ${product.precio_venta}</p>
        <Link to={`/detail/${product.id_producto}`} className="btn btn-accent card-link">Ver Detalle</Link>
        <button className="btn btn-primary" onClick={handleAddToCart}>Agregar al Carrito</button>
      </div>
    </div>
  );
};

export default ProductCard;
