# Contrato de API REST para el Proceso de Clientes y sus pedidos

## Proceso de Venta y validación
```yaml
1. Realización del Pedido:

. El cliente realiza un pedido en el sitio web

. El sistema registra el pedido con un estado inicial, como "pendiente de entrega"

2. Recepción del Pago:

. El sistema de pago precesa la transacción

. Una vez confirmado el pago, el estado del pedido se actualiza a "pagado"

3. Actualizadión del Inventario:

. Tras la confirmación del pago, el sistema reduce la cantidad del producto del inventario

. El movimiento de inventario se registra como una "venta"

4. Preparación y envío:

.  El pedido se prepara para el envío

.  El estado del pedido seactualiza a "en preparación" y luego a "enviado" una vez que se despacha.

## Esquemas
### Pedido de cliente
```yaml
Pedido:
  type: object
  required:
    - cliente_id
    - productos
  properties:
    id_pedido:
      type: integer
      description: ID del pedido
    cliente_id:
      type: integer
      description: ID del cliente
    fecha_pedido:
      type: string
      format: date-time
      description: Fecha del pedido
    estado:
      type: string
      description: Estado del pedido (pendiente de pago, pagado, en preparación, enviado)
    total:
      type: number
      description: Total del pedido
    productos:
      type: array
      items:
        type: object
        properties:
          producto_id:
            type: integer
            description: ID del producto
          cantidad:
            type: integer
            description: Cantidad del producto
          precio_unitario:
            type: number
            description: Precio unitario del producto
          subtotal:
            type: number
            description: Subtotal del producto
  example:
    id_pedido: 789
    cliente_id: 456
    fecha_pedido: "2025-01-13T18:34:00Z"
    estado: pendiente de pago
    total: 45.97
    productos:
      - producto_id: 1
        cantidad: 2
        precio_unitario: 15.99
        subtotal: 31.98
      - producto_id: 3
        cantidad: 1
        precio_unitario: 13.99
        subtotal: 13.99

## Endpoints

### Pedidos de Clientes
Proceso de Pedido del Cliente

1. Selección de Productos:
   . El cliente navega por el catálogo de productos y añade los productos deseados al carrito de compras.

2. Revisión del Carrito:
   .  El cliente revisa los productos en el carrito y procede al checkout.

3. Realización del Pedido:
   .  El cliente completa la información de envío y pago.
   .  Al hacer click en un botón "Realizar Pedido", se envía una solicitud al backend para crear el pedido.

#### Endpoint para crear el pedido

POST /pedidos:
  summary: Crear un nuevo pedido
  tags: [Pedidos]
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Pedido'
  responses:
    201:
      description: Pedido creado exitosamente
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Pedido'

POST /pedidos

Request:
{
  "cliente_id": 456,
  "productos": [
    {
      "producto_id": 1,
      "cantidad": 2
    },
    {
      "producto_id": 3,
      "cantidad": 1
    }
  ],
  "direccion_envio": "123 Calle Principal, Ciudad, País",
  "metodo_pago": "tarjeta_credito"
}

Response:

{
  "id_pedido": 789,
  "cliente_id": 456,
  "fecha_pedido": "2025-01-13T18:34:00Z",
  "estado": "pendiente de pago",
  "total": 45.97,
  "productos": [
    {
      "producto_id": 1,
      "cantidad": 2,
      "precio_unitario": 15.99,
      "subtotal": 31.98
    },
    {
      "producto_id": 3,
      "cantidad": 1,
      "precio_unitario": 13.99,
      "subtotal": 13.99
    }
  ],
  "direccion_envio": "123 Calle Principal, Ciudad, País",
  "metodo_pago": "tarjeta_credito"
}

#### Obtener la lista de pedidos

GET /pedidos:
  summary: Obtener la lista de pedidos
  tags: [Pedidos]
  parameters:
    - in: query
      name: cliente_id
      schema:
        type: integer
      description: Filtrar por ID de cliente
    - in: query
      name: estado
      schema:
        type: string
      description: Filtrar por estado del pedido
    - in: query
      name: fecha_inicio
      schema:
        type: string
        format: date-time
      description: Filtrar por fecha de inicio
    - in: query
      name: fecha_fin
      schema:
        type: string
        format: date-time
      description: Filtrar por fecha de fin
    - in: query
      name: page
      schema:
        type: integer
      description: Número de página para la paginación
    - in: query
      name: page_size
      schema:
        type: integer
      description: Tamaño de la página para la paginación
  responses:
    200:
      description: Lista de pedidos
      content:
        application/json:
          schema:
            type: array
            items:
              $ref: '#/components/schemas/Pedido'

#### Obtener un pedido por ID

GET /pedidos/{id}:
  summary: Obtener un pedido por ID
  tags: [Pedidos]
  parameters:
    - in: path
      name: id
      schema:
        type: integer
      required: true
      description: ID del pedido
  responses:
    200:
      description: Pedido encontrado
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Pedido'
    404:
      description: Pedido no encontrado

#### Actualizar un pedido existente

PUT /pedidos/{id}:
  summary: Actualizar un pedido existente
  tags: [Pedidos]
  parameters:
    - in: path
      name: id
      schema:
        type: integer
      required: true
      description: ID del pedido
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Pedido'
  responses:
    200:
      description: Pedido actualizado exitosamente
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Pedido'
    404:
      description: Pedido no encontrado

#### Eliminar un pedido

DELETE /pedidos/{id}:
  summary: Eliminar un pedido
  tags: [Pedidos]
  parameters:
    - in: path
      name: id
      schema:
        type: integer
      required: true
      description: ID del pedido
  responses:
    200:
      description: Pedido eliminado exitosamente
    404:
      description: Pedido no encontrado

#### Validar el pago de un pedido y actualizar el inventario
1. Recepción del pago:
   . El sistema de pago procesa la transacción
   . Una vez confirmado el cobro, el estado del pedido se actualiza a "Cobrado".
2. Actualización del Inventario:
   . Tras una confirmación del cobro, el sistema reduce la cantidad del producto en el inventario
   .  El movimiento de inventario se registra como una "venta".

PUT /pedidos/{id}/validar_pago:
  summary: Validar el pago de un pedido y actualizar el inventario
  tags: [Pedidos]
  parameters:
    - in: path
      name: id
      schema:
        type: integer
      required: true
      description: ID del pedido
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          properties:
            estado:
              type: string
              description: Estado del pedido (pagado)
            usuario_id:
              type: integer
              description: ID del usuario que valida el pago
  responses:
    200:
      description: Pago validado y inventario actualizado exitosamente
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/Pedido'

## Ejemplo de Endpoint
### Proceso de Venta y Validación

PUT /pedidos/{id}/validar_pago
Request:
{
  "estado": "pagado",
  "usuario_id": 123
}

Response: 
{
  "mensaje": "Pago validado y inventario actualizado exitosamente",
  "pedido": {
    "id_pedido": 789,
    "cliente_id": 456,
    "fecha_pedido": "2025-01-13T18:34:00Z",
    "estado": "pagado",
    "total": 45.97
  },
  "movimientos_stock": [
    {
      "id_movimiento": 1,
      "producto_id": 1,
      "tipo_movimiento": "venta",
      "cantidad": 2,
      "fecha_movimiento": "2025-01-13T18:34:00Z",
      "descripcion": "Venta de producto",
      "estado": "completado",
      "usuario_id": 123
    },
    {
      "id_movimiento": 2,
      "producto_id": 3,
      "tipo_movimiento": "venta",
      "cantidad": 1,
      "fecha_movimiento": "2025-01-13T18:34:00Z",
      "descripcion": "Venta de producto",
      "estado": "completado",
      "usuario_id": 123
    }
  ]
}

## Filtros y paginación para Pedidos de clientes

### GET/pedidos

Descripción: Obtener la lista de pedidos con soporte para paginación

Parámetros de Consulta:
. cliente_id (opcional)
. estado (opcional)
. page (opcional)
. page_size (opcional)

Ejemplo de solicitud:

GET /pedidos?cliente_id=456&estado=pagado&page=1&page_size=10

Ejemplo de respuesta:

{
  "total_items": 50,
  "total_pages": 5,
  "current_page": 1,
  "page_size": 10,
  "pedidos": [
    {
      "id_pedido": 789,
      "cliente_id": 456,
      "fecha_pedido": "2025-01-13T18:34:00Z",
      "estado": "pagado",
      "total": 45.97,
      "productos": [
        {
          "producto_id": 1,
          "cantidad": 2,
          "precio_unitario": 15.99,
          "subtotal": 31.98
        },
        {
          "producto_id": 3,
          "cantidad": 1,
          "precio_unitario": 13.99,
          "subtotal": 13.99
        }
      ],
      "direccion_envio": "123 Calle Principal, Ciudad, País",
      "metodo_pago": "tarjeta_credito"
    },
    ...
  ]
}

