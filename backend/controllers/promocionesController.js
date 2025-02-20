// para obtener los productos en promoción
const { DB } = require('../config/db');

const obtenerProductosPromocion = async (req, res) => {
  try {
    const result = await DB.query("SELECT * FROM productos WHERE descripcion LIKE 'Promocion%' LIMIT 4");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos en promoción' });
  }
};

module.exports = { obtenerProductosPromocion };