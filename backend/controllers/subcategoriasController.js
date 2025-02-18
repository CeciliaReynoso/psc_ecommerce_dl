const { obtenerSubcategorias, crearSubcategoria, actualizarSubcategoria, eliminarSubcategoria } = require('../models/subcategoriasModel');

const getSubcategorias = async (req, res) => {
  try {
    const subcategorias = await obtenerSubcategorias();
    res.json(subcategorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las subcategorías', error });
  }
};

const createSubcategoria = async (req, res) => {
  try {
    const nuevaSubcategoria = await crearSubcategoria(req.body);
    res.status(201).json(nuevaSubcategoria);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la subcategoría', error });
  }
};

const updateSubcategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategoriaActualizada = await actualizarSubcategoria(id, req.body);
    res.json(subcategoriaActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la subcategoría', error });
  }
};

const deleteSubcategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarSubcategoria(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la subcategoría', error });
  }
};

module.exports = {
  getSubcategorias,
  createSubcategoria,
  updateSubcategoria,
  deleteSubcategoria,
};