const { DB } = require('../config/db');

const obtenerSubcategorias = async () => {
  const { rows } = await DB.query('SELECT * FROM subcategorias');
  return rows;
};

const crearSubcategoria = async ({ id_categoria, nombre, descripcion }) => {
  const { rows } = await DB.query(
    'INSERT INTO subcategorias (id_categoria, nombre, descripcion) VALUES ($1, $2, $3) RETURNING *',
    [id_categoria, nombre, descripcion]
  );
  return rows[0];
};

const actualizarSubcategoria = async (id_subcategoria, { id_categoria, nombre, descripcion }) => {
  const { rows } = await DB.query(
    'UPDATE subcategorias SET id_categoria = $1, nombre = $2, descripcion = $3 WHERE id_subcategoria = $4 RETURNING *',
    [id_categoria, nombre, descripcion, id_subcategoria]
  );
  return rows[0];
};

const eliminarSubcategoria = async (id) => {
  await DB.query('DELETE FROM subcategorias WHERE id_subcategoria = $1', [id]);
};

module.exports = {
  obtenerSubcategorias,
  crearSubcategoria,
  actualizarSubcategoria,
  eliminarSubcategoria,
};