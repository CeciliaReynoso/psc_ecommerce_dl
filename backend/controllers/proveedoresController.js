const Proveedor = require('../models/proveedoresModel');

exports.getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.obtenerProveedores();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los proveedores', error });
  }
};

exports.createProveedor = async (req, res) => {
  try {
    const { nombre, contacto, direccion, telefono, email } = req.body;
    const nuevoProveedor = await Proveedor.crearProveedor(nombre, contacto, direccion, telefono, email);
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el proveedor', error });
  }
};

exports.updateProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, contacto, direccion, telefono, email } = req.body;
    const proveedorActualizado = await Proveedor.actualizarProveedor(id, nombre, contacto, direccion, telefono, email);
    res.json(proveedorActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el proveedor', error });
  }
};

exports.deleteProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    await Proveedor.eliminarProveedor(id);
    res.json({ message: 'Proveedor eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el proveedor', error });
  }
};