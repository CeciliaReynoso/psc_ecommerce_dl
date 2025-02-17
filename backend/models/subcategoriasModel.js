const { DB } = require('../config/db');

const obtenerSubcategorias = async () => {
  const { rows } = await DB.query('SELECT * FROM subcategorias');
  return rows;
};

const crearSubcategoria = async ({ nombre, descripcion, categoria_id }) => {
  const { rows } = await DB.query(
    'INSERT INTO subcategorias (nombre, descripcion, id_categoria) VALUES ($1, $2, $3) RETURNING *',
    [nombre, descripcion, categoria_id]
  );
  return rows[0];
};

const eliminarSubcategoria = async (id) => {
  await DB.query('DELETE FROM subcategorias WHERE id_subcategoria = $1', [id]);
};

module.exports = {
  obtenerSubcategorias,
  crearSubcategoria,
  eliminarSubcategoria,
};