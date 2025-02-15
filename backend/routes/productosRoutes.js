const express = require('express');
const { DB } = require('../config/db');
const router = express.Router();

// Endpoint para obtener productos con stock mínimo
router.get('/productos/stock_minimo', async (req, res) => {
  try {
    const client = await DB.connect();
    const productosQuery = 'SELECT * FROM productos WHERE stock_actual <= stock_minimo';
    const productosResult = await client.query(productosQuery);
    client.release();
    res.status(200).json(productosResult.rows);
  } catch (error) {
    console.error('Error al obtener productos con stock mínimo:', error);
    res.status(500).json({ error: 'Error al obtener productos con stock mínimo' });
  }
});

// Endpoint para crear un nuevo pedido a proveedor
router.post('/pedidos_proveedor', async (req, res) => {
  const { proveedor_id, productos } = req.body;
  try {
    const client = await DB.connect();
    await client.query('BEGIN');

    // Crear un nuevo pedido a proveedor
    const nuevoPedidoQuery = 'INSERT INTO pedidos_proveedor (proveedor_id, estado, total) VALUES ($1, $2, $3) RETURNING id_pedido_proveedor';
    const nuevoPedidoResult = await client.query(nuevoPedidoQuery, [proveedor_id, 'pendiente', 0]);
    const nuevoPedidoId = nuevoPedidoResult.rows[0].id_pedido_proveedor;

    // Añadir detalles del pedido a proveedor
    let total = 0;
    for (const producto of productos) {
      const { producto_id, cantidad, precio_unitario } = producto;
      const subtotal = cantidad * precio_unitario;
      total += subtotal;

      const detallePedidoQuery = 'INSERT INTO detalles_pedido_proveedor (pedido_proveedor_id, producto_id, cantidad, precio_unitario, subtotal) VALUES ($1, $2, $3, $4, $5)';
      await client.query(detallePedidoQuery, [nuevoPedidoId, producto_id, cantidad, precio_unitario, subtotal]);
    }

    // Actualizar el total del pedido a proveedor
    const actualizarTotalQuery = 'UPDATE pedidos_proveedor SET total = $1 WHERE id_pedido_proveedor = $2';
    await client.query(actualizarTotalQuery, [total, nuevoPedidoId]);

    await client.query('COMMIT');
    client.release();
    res.status(201).json({ message: 'Pedido a proveedor creado exitosamente', pedido_id: nuevoPedidoId });
  } catch (error) {
    console.error('Error al crear el pedido a proveedor:', error);
    res.status(500).json({ error: 'Error al crear el pedido a proveedor' });
  }
});

// Endpoint para validar la recepción de un pedido a proveedor
router.put('/pedidos_proveedor/:id/validar', async (req, res) => {
  const { id } = req.params;
  const { estado, usuario_id } = req.body;
  try {
    const client = await DB.connect();
    await client.query('BEGIN');

    // Actualizar el estado del pedido a proveedor
    const actualizarEstadoQuery = 'UPDATE pedidos_proveedor SET estado = $1 WHERE id_pedido_proveedor = $2';
    await client.query(actualizarEstadoQuery, [estado, id]);

    // Obtener los detalles del pedido a proveedor
    const detallesQuery = 'SELECT * FROM detalles_pedido_proveedor WHERE pedido_proveedor_id = $1';
    const detallesResult = await client.query(detallesQuery, [id]);

    // Registrar movimientos de stock
    for (const detalle of detallesResult.rows) {
      const { producto_id, cantidad } = detalle;
      const movimientoQuery = 'INSERT INTO movimientos_stock (producto_id, tipo_movimiento, cantidad, descripcion, estado, usuario_id) VALUES ($1, $2, $3, $4, $5, $6)';
      await client.query(movimientoQuery, [producto_id, 'compra', cantidad, 'Compra de producto', estado, usuario_id]);

      // Actualizar el stock actual del producto
      const actualizarStockQuery = 'UPDATE productos SET stock_actual = stock_actual + $1 WHERE id_producto = $2';
      await client.query(actualizarStockQuery, [cantidad, producto_id]);
    }

    await client.query('COMMIT');
    client.release();
    res.status(200).json({ message: 'Recepción validada y inventario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al validar la recepción del pedido a proveedor:', error);
    res.status(500).json({ error: 'Error al validar la recepción del pedido a proveedor' });
  }
});

module.exports = router;