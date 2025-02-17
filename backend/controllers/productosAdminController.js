const { obtenerProductosAdmin, crearProductoAdmin, actualizarProductoAdmin, eliminarProductoAdmin } = require('../models/productosAdminModels');

const getProductosAdmin = async (req, res) => {
  try {
    const productos = await obtenerProductosAdmin();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos', error });
  }
};

const createProductoAdmin = async (req, res) => {
  try {
    const nuevoProducto = await crearProductoAdmin(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};

const updateProductoAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const productoActualizado = await actualizarProductoAdmin(id, req.body);
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
};

const deleteProductoAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarProductoAdmin(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

module.exports = {
  getProductosAdmin,
  createProductoAdmin,
  updateProductoAdmin,
  deleteProductoAdmin,
};