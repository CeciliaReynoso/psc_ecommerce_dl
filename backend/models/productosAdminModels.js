const { DB } = require('../config/db');

const obtenerProductosAdmin = async () => {
  const { rows } = await DB.query('SELECT * FROM productos');
  return rows;
};

const crearProductoAdmin = async ({ nombre, descripcion, precio_venta, categoria_id, subcategoria_id, stock_minimo, proveedor_id, imagen_url }) => {
  const { rows } = await DB.query(
    'INSERT INTO productos (nombre, descripcion, precio_venta, precio_costo, categoria_id, subcategoria_id, stock_actual, stock_minimo, proveedor_id, imagen_url) VALUES ($1, $2, $3, 0, $4, $5, 0, $6, $7, $8) RETURNING *',
    [nombre, descripcion, precio_venta, categoria_id, subcategoria_id, stock_minimo, proveedor_id, imagen_url]
  );
  return rows[0];
};

const actualizarProductoAdmin = async (id_producto, { descripcion, precio_venta, stock_minimo, imagen_url }) => {
  const { rows } = await DB.query(
    'UPDATE productos SET descripcion=$1, precio_venta = $2, stock_minimo = $3, imagen_url = $4, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id_producto = $5 RETURNING *',
    [descripcion,precio_venta, stock_minimo, imagen_url, id_producto]
  );
  return rows[0];
};

const eliminarProductoAdmin = async (id_producto) => {
  await DB.query('DELETE FROM productos WHERE id_producto = $1', [id_producto]);
};

module.exports = {
  obtenerProductosAdmin,
  crearProductoAdmin,
  actualizarProductoAdmin,
  eliminarProductoAdmin,
};