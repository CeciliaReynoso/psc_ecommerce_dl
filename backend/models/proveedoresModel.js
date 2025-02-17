const { DB } = require('../config/db');

const obtenerProveedores = async () => {
  const { rows } = await DB.query('SELECT * FROM proveedores');
  return rows;
};

const crearProveedor = async (nombre, contacto, direccion, telefono, email) => {
  const { rows } = await DB.query(
    'INSERT INTO proveedores (nombre, contacto, direccion, telefono, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nombre, contacto, direccion, telefono, email]
  );
  return rows[0];
};

const actualizarProveedor = async (id_proveedor, nombre, contacto, direccion, telefono, email) => {
  const { rows } = await DB.query(
    'UPDATE proveedores SET nombre = $1, contacto = $2, direccion = $3, telefono = $4, email = $5 WHERE id_proveedor = $6 RETURNING *',
    [nombre, contacto, direccion, telefono, email, id_proveedor]
  );
  return rows[0];
};

const eliminarProveedor = async (id_proveedor) => {
  await DB.query('DELETE FROM proveedores WHERE id_proveedor = $1', [id_proveedor]);
};

module.exports = {
  obtenerProveedores,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor,
};