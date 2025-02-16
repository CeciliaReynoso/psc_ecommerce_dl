const { crearPedidoProveedor, validarRecepcionPedido } = require('../models/productosModel');

const crearPedido = async (req, res) => {
  const { proveedor_id, productos } = req.body;
  try {
    const nuevoPedidoId = await crearPedidoProveedor(proveedor_id, productos);
    res.status(201).json({ message: 'Pedido a proveedor creado exitosamente', pedido_id: nuevoPedidoId });
  } catch (error) {
    console.error('Error al crear el pedido a proveedor:', error);
    res.status(500).json({ error: 'Error al crear el pedido a proveedor' });
  }
};

const validarRecepcion = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario_id } = req.body;
  try {
    await validarRecepcionPedido(id, estado, usuario_id);
    res.status(200).json({ message: 'Recepción validada y inventario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al validar la recepción del pedido a proveedor:', error);
    res.status(500).json({ error: 'Error al validar la recepción del pedido a proveedor' });
  }
};

module.exports = {
  crearPedido,
  validarRecepcion,
};