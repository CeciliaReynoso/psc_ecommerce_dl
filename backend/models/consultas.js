const { DB } = require("../config/db");
const bcrypt = require('bcryptjs');

const obtenerUsuarios = async () => {
  const { rows } = await DB.query("SELECT * FROM usuarios");
  return rows;
};

const obtenerUsuarioPorEmail = async (email) => {
  const { rows } = await DB.query("SELECT * FROM usuarios WHERE email = $1", [email]);
  if (rows.length === 0) {
    throw { code: 404, message: "No se encontró ningún usuario con este email" };
  }
  return rows[0];
};

const obtenerUsuarioPorId = async (id) => {
  const { rows } = await DB.query("SELECT * FROM usuarios WHERE id = $1", [id]);
  if (rows.length === 0) {
    throw { code: 404, message: "No se encontró ningún usuario con este id" };
  }
  return rows[0];
};

const registrarUsuario = async (email, password, nombre, direccion) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const consulta = "INSERT INTO usuarios (email, password, nombre, direccion, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const rol = 'CLIENTE'; // Asignar siempre el rol 'cliente'
  const values = [email, hashedPassword, nombre, direccion, rol];
  const result = await DB.query(consulta, values);
  return result.rows[0];
};

const modificarUsuario = async (id, email, password, rol, nombre, direccion) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const consulta = "UPDATE usuarios SET email = $1, password = $2, nombre = $3, direccion = $4 , rol = $5 WHERE id = $6 RETURNING *";
  const values = [email, hashedPassword, nombre, direccion, , rol, id];
  const result = await DB.query(consulta, values);
  if (result.rowCount === 0) {
    throw { code: 404, message: "No se consiguió ningún usuario con este id" };
  }
  return result.rows[0];
};

const eliminarUsuario = async (id) => {
  const consulta = "DELETE FROM usuarios WHERE id = $1 RETURNING *";
  const values = [id];
  const result = await DB.query(consulta, values);
  if (result.rowCount === 0) {
    throw { code: 404, message: "No se consiguió ningún usuario con este id" };
  }
  return result.rows[0];
};

const asignarRol = async (id, rol) => {
  const consulta = "UPDATE usuarios SET rol = $1 WHERE id = $2 RETURNING *";
  const values = [rol, id];
  const result = await DB.query(consulta, values);
  if (result.rowCount === 0) {
    throw { code: 404, message: "No se consiguió ningún usuario con este id" };
  }
  return result.rows[0];
};

module.exports = { obtenerUsuarios, obtenerUsuarioPorEmail, obtenerUsuarioPorId, registrarUsuario, modificarUsuario, eliminarUsuario, asignarRol };