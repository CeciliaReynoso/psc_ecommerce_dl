const { crearPedido, obtenerPedidos } = require('../models/pedidosModel');

const crearNuevoPedido = async (req, res) => {
  const { cliente_id, productos, direccion_envio, metodo_pago } = req.body;

  try {
    // Calcular el total del pedido
    const total = productos.reduce((sum, producto) => sum + producto.cantidad * producto.precio_unitario, 0);

    // Crear el pedido en la base de datos
    const pedidoId = await crearPedido(cliente_id, 'pendiente de entrega', total, productos);

    res.status(201).json({ message: 'Pedido creado exitosamente', pedido_id: pedidoId });
  } catch (error) {
    console.error('Error al crear el pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};

const obtenerTodosLosPedidos = async (req, res) => {
  try {
    const pedidos = await obtenerPedidos();
    res.status(200).json(pedidos);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

module.exports = {
  crearNuevoPedido,
  obtenerTodosLosPedidos,
};