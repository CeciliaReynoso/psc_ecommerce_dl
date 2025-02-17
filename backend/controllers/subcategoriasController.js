const Subcategoria = require('../models/subcategoriasModel');

exports.getSubcategorias = async (req, res) => {
  try {
    const subcategorias = await Subcategoria.obtenerSubcategorias();
    res.json(subcategorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las subcategorias', error });
  }
};

exports.createSubcategoria = async (req, res) => {
  try {
    const { nombre, descripcion, categoria_id } = req.body;
    await Subcategoria.crearSubcategoria({ nombre, descripcion, categoria_id });
    res.status(201).json({ message: 'Subcategoria creada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la subcategoria', error });
  }
};

exports.deleteSubcategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await Subcategoria.eliminarSubcategoria(id);
    res.json({ message: 'Subcategoria eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la subcategoria', error });
  }
};