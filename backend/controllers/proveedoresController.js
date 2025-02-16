const { obtenerProveedores, crearProveedor, eliminarProveedor, actualizarProveedor } = require('../models/proveedoresModel');

const obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await obtenerProveedores();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
};

const crearProveedor = async (req, res) => {
  const { nombre, contacto, direccion, telefono, email } = req.body;
  try {
    await crearProveedor({ nombre, contacto, direccion, telefono, email });
    res.status(201).json({ message: 'Proveedor creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proveedor' });
  }
};

const eliminarProveedor = async (req, res) => {
  const { id } = req.params;
  try {
    await eliminarProveedor(id);
    res.status(200).json({ message: 'Proveedor eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proveedor' });
  }
};

const actualizarProveedor = async (req, res) => {
  const { id } = req.params;
  const { nombre, contacto, direccion, telefono, email } = req.body;
  try {
    await actualizarProveedor(id, { nombre, contacto, direccion, telefono, email });
    res.status(200).json({ message: 'Proveedor actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el proveedor' });
  }
};

module.exports = {
  obtenerProveedores,
  crearProveedor,
  eliminarProveedor,
  actualizarProveedor,
};