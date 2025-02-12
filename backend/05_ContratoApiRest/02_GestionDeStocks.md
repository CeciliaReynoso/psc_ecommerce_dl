# Contrato de API REST para Gestión de Stock Mínimo y Pedidos a Proveedores

## Esquemas

### Producto
```yaml
Producto:
  type: object
  required:
    - nombre
    - precio_venta
    - precio_costo
  properties:
    id_producto:
      type: integer
      description: ID del producto
    nombre:
      type: string
      description: Nombre del producto
    descripcion:
      type: string
      description: Descripción del producto
    precio_venta:
      type: number
      description: Precio de venta del producto
    precio_costo:
      type: number
      description: Precio de costo del producto
    categoria_id:
      type: integer
      description: ID de la categoría
    subcategoria_id:
      type: integer
      description: ID de la subcategoría
    stock_actual:
      type: integer
      description: Stock actual del producto
    stock_minimo:
      type: integer
      description: Stock mínimo del producto
    proveedor_id:
      type: integer
      description: ID del proveedor
    fecha_creacion:
      type: string
      format: date-time
      description: Fecha de creación del producto
    fecha_actualizacion:
      type: string
      format: date-time
      description: Fecha de última actualización del producto
    imagen_url:
      type: string
      description: URL de la imagen del producto
  example:
    id_producto: 1
    nombre: Collar para perro
    descripcion: Collar ajustable para perro
    precio_venta: 15.99
    precio_costo: 10.00
    categoria_id: 2
    subcategoria_id: 3
    stock_actual: 50
    stock_minimo: 10
    proveedor_id: 123
    fecha_creacion: "2025-01-13T18:34:00Z"
    fecha_actualizacion: "2025-01-13T18:34:00Z"
    imagen_url: "https://example.com/imagenes/collar_perro.jpg"

### Pedido de productos al proveedor

#### PedidoProveedor

PedidoProveedor:
  type: object
  required:
    - proveedor_id
    - productos
  properties:
    id_pedido_proveedor:
      type: integer
      description: ID del pedido a proveedor
    proveedor_id:
      type: integer
      description: ID del proveedor
    fecha_pedido:
      type: string
      format: date-time
      description: Fecha del pedido
    estado:
      type: string
      description: Estado del pedido (pendiente, completado)
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
    id_pedido_proveedor: 456
    proveedor_id: 123
    fecha_pedido: "2025-01-13T18:34:00Z"
    estado: pendiente
    total: 950.00
    productos:
      - producto_id: 1
        cantidad: 50
        precio_unitario: 10.00
        subtotal: 500.00
      - producto_id: 2
        cantidad: 30
        precio_unitario: 15.00
        subtotal: 450.00

### Endpoints

#### Obtener la lista de productos

GET /productos:
  summary: Obtener la lista de productos
  tags: [Productos]
  parameters:
    - in: query
      name: categoria_id
      schema:
        type: integer
      description: Filtrar por ID de categoría
    - in: query
      name: subcategoria_id
      schema:
        type: integer
      description: Filtrar por ID de subcategoría
    - in: query
      name: nombre
      schema:
        type: string
      description: Filtrar por nombre del producto
    - in: query
      name: precio_min
      schema:
        type: number
      description: Filtrar por precio mínimo
    - in: query
      name: precio_max
      schema:
        type: number
      description: Filtrar por precio máximo
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
      description: Lista de productos
      content:
        application/json:
          schema:
            type: array
            items:
              $ref: '#/components/schemas/Producto'

#### Crear un nuevo pedido a proveedor

POST /pedidos_proveedor:
  summary: Crear un nuevo pedido a proveedor
  tags: [PedidosProveedor]
  requestBody:
    required: true
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/PedidoProveedor'
  responses:
    201:
      description: Pedido creado exitosamente
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/PedidoProveedor'
Ejemplo de Endpoint para crear Pedido a Proveedor:
Request:
{
  "proveedor_id": 123,
  "productos": [
    {
      "producto_id": 1,
      "cantidad": 50
    },
    {
      "producto_id": 2,
      "cantidad": 30
    }
  ],
  "fecha_pedido": "2025-01-13T18:34:00Z",
  "estado": "pendiente"
}
Response:

{
  "id_pedido_proveedor": 456,
  "proveedor_id": 123,
  "fecha_pedido": "2025-01-13T18:34:00Z",
  "estado": "pendiente",
  "productos": [
    {
      "producto_id": 1,
      "cantidad": 50,
      "precio_unitario": 10.00,
      "subtotal": 500.00
    },
    {
      "producto_id": 2,
      "cantidad": 30,
      "precio_unitario": 15.00,
      "subtotal": 450.00
    }
  ],
  "total": 950.00
}

#### Obtener la lista de pedidos a proveedores

GET /pedidos_proveedor:
  summary: Obtener la lista de pedidos a proveedores
  tags: [PedidosProveedor]
  parameters:
    - in: query
      name: proveedor_id
      schema:
        type: integer
      description: Filtrar por ID de proveedor
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
      description: Lista de pedidos a proveedores
      content:
        application/json:
          schema:
            type: array
            items:
              $ref: '#/components/schemas/PedidoProveedor'

#### Validar la recepcion de un pedido a proveedor
1. Recepción del Pedido:
   . Cuando el proveedor entrega la mercadería, se registra en el sistema como un movimiento de inventario pendiente

   .  Un usuario autorizado revisa y valida la entrega
Endpoint para Validación de Recepción:

PUT /pedidos_proveedor/{id}/validar:
  summary: Validar la recepción de un pedido a proveedor y actualizar el inventario
  tags: [PedidosProveedor]
  parameters:
    - in: path
      name: id
      schema:
        type: integer
      required: true
      description: ID del pedido a proveedor
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          properties:
            estado:
              type: string
              description: Estado del pedido (completado)
            usuario_id:
              type: integer
              description: ID del usuario que valida la recepción
  responses:
    200:
      description: Recepción validada y inventario actualizado exitosamente
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/PedidoProveedor'
Ejemplo:

Request:
{
  "estado": "completado",
  "usuario_id": 789
}
Response:

{
  "mensaje": "Recepción validada y inventario actualizado exitosamente",
  "pedido_proveedor": {
    "id_pedido_proveedor": 456,
    "proveedor_id": 123,
    "fecha_pedido": "2025-01-13T18:34:00Z",
    "estado": "completado",
    "total": 950.00
  },
  "movimientos_stock": [
    {
      "id_movimiento": 1,
      "producto_id": 1,
      "tipo_movimiento": "compra",
      "cantidad": 50,
      "fecha_movimiento": "2025-01-13T18:34:00Z",
      "descripcion": "Compra de producto",
      "estado": "completado",
      "usuario_id": 789
    },
    {
      "id_movimiento": 2,
      "producto_id": 2,
      "tipo_movimiento": "compra",
      "cantidad": 30,
      "fecha_movimiento": "2025-01-13T18:34:00Z",
      "descripcion": "Compra de producto",
      "estado": "completado",
      "usuario_id": 789
    }
  ]
}

## Categorías

### Obtener la lista de categorias

Path: GET/categorias
Response:

[
  {
    "id_categoria": 1,
    "nombre": "Accesorios",
    "descripcion": "Accesorios para mascotas"
  },
  ...
]

### Obtener los detalles de una categoria específica

Parámetros:

Path: GET/categorias/{id}
id(path): ID de la categoría

### Endpoints para categorías

Response:

{
  "id_categoria": 1,
  "nombre": "Accesorios",
  "descripcion": "Accesorios para mascotas"
}

#### POST/categorías
.  Descripción: Crear una nueva categoría

Request:
{
  "nombre": "Accesorios",
  "descripcion": "Accesorios para mascotas"
}
Response:
{
  "id_categoria": 1,
  "nombre": "Accesorios",
  "descripcion": "Accesorios para mascotas"
}

#### PUT/categorias/{id}
. Descripción: Actualizar una categoría existente
. Parámetros:
    id(path): ID de la categoría
. Request:
{
  "nombre": "Accesorios",
  "descripcion": "Accesorios para mascotas"
}
Response:
{
  "id_categoria": 1,
  "nombre": "Accesorios",
  "descripcion": "Accesorios para mascotas"
}
#### DELETE/categorias/{id}
. Descripcion: Eliminar una categoría
. Parámetros:
   id(path): ID de la categoría
Response:
{
  "mensaje": "Categoría eliminada exitosamente"
}
...aqui comienzan subcategorias...


## Subcategorías

### Obtener la lista de subcategorias

Path: GET/Subcategorias
Response:

[
  {
    "id_subcategoria": 1,
    "categoria_id": 1,
    "nombre": "Alimentos para perros",
    "descripcion": "Comida y snacks para perros"
  },
  ...
]

### Obtener los detalles de una Subcategoria específica

Parámetros:

Path: GET/Subcategorias/{id}
id(path): ID de la Subcategoría

Response:

{
  "id_subcategoria": 1,
  "categoria_id": 1,
  "nombre": "Alimentos para perros",
  "descripcion": "Comida y snacks para perros"
}

#### POST/Subcategorías
.  Descripción: Crear una nueva Subcategoría

Request:
{
  "categoria_id": 1,
  "nombre": "Alimentos para perros",
  "descripcion": "Comida y snacks para perros"
}


Response:
{
  "id_subcategoria": 1,
  "categoria_id": 1,
  "nombre": "Alimentos para perros",
  "descripcion": "Comida y snacks para perros"
}


#### PUT/subcategorias/{id}
. Descripción: Actualizar una subcategoría existente
. Parámetros:
    id(path): ID de la subcategoría
. Request:
{
  "categoria_id": 1,
  "nombre": "Alimentos para perros",
  "descripcion": "Comida y snacks para perros"
}
Response:
{
  "id_subcategoria": 1,
  "categoria_id": 1,
  "nombre": "Alimentos para perros",
  "descripcion": "Comida y snacks para perros"
}

#### DELETE/subcategorias/{id}
. Descripcion: Eliminar una subcategoría
. Parámetros:
   id(path): ID de la categoría
Response:
{
  "mensaje": "Subcategoría eliminada exitosamente"
}

## Filtros y Paginación

Descripción: Obtener la lista de productos con soporte para filtros y paginación

Parámetros de consulta:
. categoria_id (opcional)
. subcategoria_id (opcional)
. nombre (opcional)
. precio_min (opcional)
. precio_max (opcional)
. page (opcional)
. page_size (opcional)

Ejemplo de solicitud:
GET /productos?categoria_id=2&precio_min=10&precio_max=50&page=1&page_size=10

Respuesta:
{
  "total_items": 100,
  "total_pages": 10,
  "current_page": 1,
  "page_size": 10,
  "productos": [
    {
      "id_producto": 1,
      "nombre": "Collar para perro",
      "descripcion": "Collar ajustable para perro",
      "precio": 15.99,
      "categoria_id": 2,
      "subcategoria_id": 3,
      "stock_actual": 50,
      "imagen_url": "https://example.com/imagenes/collar_perro.jpg"
    },
    ...
  ]
}

# Proceso de Validación

1. Recepción de Mercadería: Cuando llega una nueva entrega, se registra en el sistema como un movimientos de inventario pendiente.

2. Revisión y Validación: un usuario autorizado revisa los detalles de la entrega (cantidad, calidad, etc.) y valida el movimiento en el sistema.

3. Actualización del Inventario: Una vez validado, el sistema actualiza el inventario y marca el movimiento como completado.

## Endpoint para validación

. Descripción: Validar un movimiento de inventario para asegurar que solo los movimientos de inventario revisados y aprobados se reflejen en el sistema, manteniendo la integridad y precisión del inventario.

. Parámetros:
  id (path): ID del movimiento de inventario

  estado (body): Estado de movimiento (completado)

  usuario_id (body): ID del usuario que valida el movimiento

Request:

PUT /movimientos_stock/{id}/validar
{
  "estado": "completado",
  "usuario_id": 123
}

Response:

{
  "mensaje": "Movimiento de inventario validado exitosamente",
  "movimiento": {
    "id_movimiento": 1,
    "producto_id": 1,
    "tipo_movimiento": "compra",
    "cantidad": 10,
    "fecha_movimiento": "2025-01-13T18:34:00Z",
    "descripcion": "Compra de producto",
    "estado": "completado",
    "usuario_id": 123
  }
}



