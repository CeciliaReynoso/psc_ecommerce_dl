import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard'; 
import { Link } from 'react-router-dom';
import tiendaImage from '../../assets/tienda.png'; 
import { ENDPOINT } from '../config/constans';

const ProductGallery = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductosPromocion = async () => {
      try {
        const response = await axios.get(`${ENDPOINT.promocion}`);
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener los productos en promoción:', error);
      }
    };

    fetchProductosPromocion();
  }, []);

  return (
    <div className="app-container">
      <section className="recent-posts">      
        <Link to="/tienda" className="tienda-link">
        <img src={tiendaImage} alt="Tienda" className="tienda-icon" /><span>Pulsa aquí para ver más productos</span>
        </Link>
        <h3>Publicaciones Recientes</h3>
      </section>

      <div className="gallery-container">
        {productos.map(producto => (
          <div key={producto.id_producto} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <ProductCard product={producto} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;