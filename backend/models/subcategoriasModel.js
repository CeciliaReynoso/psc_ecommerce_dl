const { DB } = require('../config/db');

const obtenerSubcategorias = async () => {
  const client = await DB.connect();
  const result = await client.query('SELECT * FROM subcategorias');
  client.release();
  return result.rows;
};

const crearSubcategoria = async ({ nombre, descripcion, categoria_id }) => {
  const client = await DB.connect();
  await client.query('INSERT INTO subcategorias (nombre, descripcion, id_categoria) VALUES ($1, $2, $3)', [nombre, descripcion, categoria_id]);
  client.release();
};

const eliminarSubcategoria = async (id) => {
  const client = await DB.connect();
  await client.query('DELETE FROM subcategorias WHERE id_subcategoria = $1', [id]);
  client.release();
};

module.exports = {
  obtenerSubcategorias,
  crearSubcategoria,
  eliminarSubcategoria,
};
