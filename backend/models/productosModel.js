const { DB } = require('../config/db');

const crearPedidoProveedor = async (proveedor_id, productos) => {
  const client = await DB.connect();
  await client.query('BEGIN');

  const nuevoPedidoQuery = 'INSERT INTO pedidos_proveedor (proveedor_id, estado, total) VALUES ($1, $2, $3) RETURNING id_pedido_proveedor';
  const nuevoPedidoResult = await client.query(nuevoPedidoQuery, [proveedor_id, 'pendiente', 0]);
  const nuevoPedidoId = nuevoPedidoResult.rows[0].id_pedido_proveedor;

  let total = 0;
  for (const producto of productos) {
    const { producto_id, cantidad, precio_unitario } = producto;
    const subtotal = cantidad * precio_unitario;
    total += subtotal;

    const detallePedidoQuery = 'INSERT INTO detalles_pedido_proveedor (pedido_proveedor_id, producto_id, cantidad, precio_unitario, subtotal) VALUES ($1, $2, $3, $4, $5)';
    await client.query(detallePedidoQuery, [nuevoPedidoId, producto_id, cantidad, precio_unitario, subtotal]);
  }

  const actualizarTotalQuery = 'UPDATE pedidos_proveedor SET total = $1 WHERE id_pedido_proveedor = $2';
  await client.query(actualizarTotalQuery, [total, nuevoPedidoId]);

  await client.query('COMMIT');
  client.release();

  return nuevoPedidoId;
};

const validarRecepcionPedido = async (id_detalle_proveedor, estado, usuario_id) => {
  const client = await DB.connect();
  await client.query('BEGIN');

  const detalleQuery = 'SELECT * FROM detalles_pedido_proveedor WHERE id_detalle_proveedor = $1';
  const detalleResult = await client.query(detalleQuery, [id_detalle_proveedor]);
  const detalle = detalleResult.rows[0];

  const actualizarEstadoQuery = 'UPDATE pedidos_proveedor SET estado = $1 WHERE id_pedido_proveedor = $2';
  await client.query(actualizarEstadoQuery, [estado, detalle.pedido_proveedor_id]);

  const movimientoQuery = 'INSERT INTO movimientos_stock (producto_id, tipo_movimiento, cantidad, descripcion, estado, usuario_id) VALUES ($1, $2, $3, $4, $5, $6)';
  await client.query(movimientoQuery, [detalle.producto_id, 'compra', detalle.cantidad, 'Compra de producto', estado, usuario_id]);

  const actualizarStockQuery = 'UPDATE productos SET stock_actual = stock_actual + $1 WHERE id_producto = $2';
  await client.query(actualizarStockQuery, [detalle.cantidad, detalle.producto_id]);

  await client.query('COMMIT');
  client.release();
};

const obtenerDetallesPedidosProveedor = async () => {
  const client = await DB.connect();
  const detallesQuery = `
    SELECT dp.id_detalle_proveedor, dp.pedido_proveedor_id, dp.producto_id, dp.cantidad, dp.precio_unitario, dp.subtotal, 
           pp.proveedor_id, pp.fecha_pedido, pp.estado, pp.total, p.nombre AS producto_nombre
    FROM detalles_pedido_proveedor dp
    JOIN pedidos_proveedor pp ON dp.pedido_proveedor_id = pp.id_pedido_proveedor
    JOIN productos p ON dp.producto_id = p.id_producto
  `;
  const detallesResult = await client.query(detallesQuery);
  client.release();
  return detallesResult.rows;
};

module.exports = {
  crearPedidoProveedor,
  validarRecepcionPedido,
  obtenerDetallesPedidosProveedor,
};