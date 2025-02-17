const { DB } = require('../config/db');

const obtenerProveedores = async () => {
  const client = await DB.connect();
  const query = 'SELECT * FROM proveedores';
  const result = await client.query(query);
  client.release();
  return result.rows;
};

const crearProveedor = async (nombre, contacto, direccion, telefono, email) => {
  const client = await DB.connect();
  const query = 'INSERT INTO proveedores (nombre, contacto, direccion, telefono, email) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const result = await client.query(query, [nombre, contacto, direccion, telefono, email]);
  client.release();
  return result.rows[0];
};

const actualizarProveedor = async (id_proveedor, nombre, contacto, direccion, telefono, email) => {
  const client = await DB.connect();
  const query = 'UPDATE proveedores SET nombre = $1, contacto = $2, direccion = $3, telefono = $4, email = $5 WHERE id_proveedor = $6 RETURNING *';
  const result = await client.query(query, [nombre, contacto, direccion, telefono, email, id_proveedor]);
  client.release();
  return result.rows[0];
};

const eliminarProveedor = async (id_proveedor) => {
  const client = await DB.connect();
  const query = 'DELETE FROM proveedores WHERE id_proveedor = $1';
  await client.query(query, [id_proveedor]);
  client.release();
};

module.exports = {
  obtenerProveedores,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
};