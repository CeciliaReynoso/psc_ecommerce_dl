import React from 'react';
import ProductCard from './ProductCard'; // Asegúrate de que la ruta sea correcta

const ProductGallery = () => {
  const productos = [
    {
      id_producto: 1,
      nombre: "Collar Ortopédico",
      descripcion: "Collar ortopédico ajustable para perros.",
      precio_venta: 29.99,
      precio_costo: 15.00,
      categoria_id: 1,
      subcategoria_id: 1,
      stock_actual: 50,
      stock_minimo: 10,
      proveedor_id: 1,
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date(),
      imagen_url: "https://m.media-amazon.com/images/I/714R-eY-T6L._AC_UL480_FMwebp_QL65_.jpg"
    },
    {
      id_producto: 2,
      nombre: "Juguete para Gatos",
      descripcion: "Juguete interactivo para gatos.",
      precio_venta: 19.99,
      precio_costo: 10.00,
      categoria_id: 2,
      subcategoria_id: 2,
      stock_actual: 100,
      stock_minimo: 20,
      proveedor_id: 2,
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date(),
      imagen_url: "https://m.media-amazon.com/images/I/81fSg1+32LL._AC_UL480_FMwebp_QL65_.jpg"
    },
    
    {
      id_producto: 3,
      nombre: "Suplemento para Articulaciones",
      descripcion: "Suplemento para mejorar la salud de las articulaciones.",
      precio_venta: 24.99,
      precio_costo: 12.00,
      categoria_id: 3,
      subcategoria_id: 4,
      stock_actual: 75,
      stock_minimo: 15,
      proveedor_id: 4,
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date(),
      imagen_url: "https://m.media-amazon.com/images/I/51ZM8wlaQCL._AC_UL480_FMwebp_QL65_.jpg"
    },
    
    {
      id_producto: 4,
      nombre: "KTS Terapia láser para perros",
      descripcion: "Dispositivo portátil de terapia láser para perros. Alivio del dolor de artritis, cadera, articulaciones, cuidado de heridas y problemas en la piel",
      precio_venta: 451.99,
      precio_costo: 18.00,
      categoria_id: 2,
      subcategoria_id: 6,
      stock_actual: 40,
      stock_minimo: 8,
      proveedor_id: 6,
      fecha_creacion: new Date(),
      fecha_actualizacion: new Date(),
      imagen_url: "https://m.media-amazon.com/images/I/6151Gnb-kSL._AC_UL480_FMwebp_QL65_.jpg"
    }
  ];

  return (
    <div className="app-container">
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
