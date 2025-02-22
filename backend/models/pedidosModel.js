const { DB } = require('../config/db');

const crearPedido = async (cliente_id, estado, total, detalles) => {
  try {
    // Iniciar una transacción
    await DB.query('BEGIN');

    // Insertar el pedido en la tabla pedidos
    const pedidoResult = await DB.query(
      'INSERT INTO pedidos (cliente_id, estado, total) VALUES ($1, $2, $3) RETURNING id_pedido',
      [cliente_id, estado, total]
    );
    const pedidoId = pedidoResult.rows[0].id_pedido;

    // Insertar los detalles del pedido en la tabla detalles_pedido
    for (const detalle of detalles) {
      const { producto_id, cantidad, precio_unitario, subtotal } = detalle;
      await DB.query(
        'INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES ($1, $2, $3, $4, $5)',
        [pedidoId, producto_id, cantidad, precio_unitario, subtotal]
      );
    }

    // Confirmar la transacción
    await DB.query('COMMIT');

    return pedidoId;
  } catch (error) {
    // Revertir la transacción en caso de error
    await DB.query('ROLLBACK');
    throw error;
  }
};

const obtenerPedidos = async () => {
  try {
    const pedidosResult = await DB.query('SELECT * FROM pedidos ORDER BY fecha_pedido DESC');
    return pedidosResult.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearPedido,
  obtenerPedidos,
};