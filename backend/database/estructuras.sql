-- Crear la tabla Proveedores antes de Productos
CREATE DATABASE petstore;

\c petstore;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE IF NOT EXISTS usuarios (
  id        SERIAL        NOT NULL,
  email     VARCHAR(50)   NOT NULL  UNIQUE,
  password  VARCHAR(60)   NOT NULL,  
  nombre    VARCHAR(50)   NOT NULL,
  direccion VARCHAR(100)  NOT NULL,
  rol       VARCHAR(20)   NOT NULL,
  PRIMARY KEY (id)
);
DROP TABLE IF EXISTS proveedores;
CREATE TABLE proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contacto VARCHAR(255),
    direccion TEXT,
    telefono VARCHAR(50),
    email VARCHAR(255)
);
INSERT INTO proveedores (
    id_proveedor, nombre, contacto, direccion, telefono, email
) VALUES
(1, 'Proveedor A', 'Juan Pérez', '123 Calle Principal, Lima, Peru', '+51 123 456 789', 'juan.perez@proveedora.com'),
(2, 'Proveedor B', 'María García', '456 Avenida Secundaria, Lima, Peru', '+51 987 654 321', 'maria.garcia@proveedorb.com'),
(3, 'Proveedor C', 'Carlos López', '789 Boulevard Central, Lima, Peru', '+51 456 789 123', 'carlos.lopez@proveedorc.com')

DROP TABLE IF EXISTS categorias;

CREATE TABLE IF NOT EXISTS categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);
INSERT INTO categorias (
    id_categoria, nombre, descripcion
) VALUES
(1, 'Perros', 'Perros'),
(2, 'Gatos', 'Gatos'),
(3, 'Otras mascotas', 'Conejos, Hamsters, Aves');

DROP TABLE IF EXISTS subcategorias;
CREATE TABLE subcategorias (
    id_subcategoria SERIAL PRIMARY KEY,
    id_categoria INT REFERENCES categorias(id_categoria),
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

DROP TABLE IF EXISTS productos;
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio_venta DECIMAL(10, 2) NOT NULL,
    precio_costo DECIMAL(10, 2) NOT NULL,
    categoria_id INT REFERENCES categorias(id_categoria),
    subcategoria_id INT REFERENCES subcategorias(id_subcategoria),
    stock_actual INT NOT NULL,
    stock_minimo INT NOT NULL,
    proveedor_id INT REFERENCES proveedores(id_proveedor),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    imagen_url TEXT
);

INSERT INTO productos (
    nombre, descripcion, precio_venta, precio_costo, categoria_id, subcategoria_id, 
    stock_actual, stock_minimo, proveedor_id, fecha_creacion, fecha_actualizacion, imagen_url
) VALUES
(
    'Collar Ortopédico', 'Collar ortopédico ajustable para perros.', 29.99, 15.00, 1, 1, 
    50, 10, 1, '2025-02-14 00:00:00', '2025-02-14 00:00:00', 'https://m.media-amazon.com/images/I/714R-eY-T6L._AC_UL480_FMwebp_QL65_.jpg'
),
(
    'Juguete para Gatos', 'Juguete interactivo para gatos.', 19.99, 10.00, 2, 2, 
    100, 20, 1, '2025-02-14 00:00:00', '2025-02-14 00:00:00', 'https://m.media-amazon.com/images/I/81fSg1+32LL._AC_UL480_FMwebp_QL65_.jpg'
),
(
    'Suplemento para Articulaciones', 'Suplemento para mejorar la salud de las articulaciones.', 24.99, 12.00, 1, 3, 
    75, 15, 1, '2025-02-14 00:00:00', '2025-02-14 00:00:00', 'https://m.media-amazon.com/images/I/51ZM8wlaQCL._AC_UL480_FMwebp_QL65_.jpg'
),
(
    'KTS Terapia láser para perros', 'Dispositivo portátil de terapia láser para perros. Alivio del dolor de artritis, cadera, articulaciones, cuidado de heridas y problemas en la piel', 151.99, 78.00, 1, 3, 
    40, 8, 1, '2025-02-14 00:00:00', '2025-02-14 00:00:00', 'https://m.media-amazon.com/images/I/6151Gnb-kSL._AC_UL480_FMwebp_QL65_.jpg'
);

DROP TABLE IF EXISTS pedidos;
CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    cliente_id INT,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) NOT NULL,
    total DECIMAL(10, 2) NOT NULL
);
DROP TABLE IF EXISTS detalles_pedido;
CREATE TABLE detalles_pedido (
    id_detalle SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES pedidos(id_pedido),
    producto_id INT REFERENCES productos(id_producto),
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);
DROP TABLE IF EXISTS pedidos_proveedor;
CREATE TABLE pedidos_proveedor (
    id_pedido_proveedor SERIAL PRIMARY KEY,
    proveedor_id INT REFERENCES proveedores(id_proveedor),
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) NOT NULL,
    total DECIMAL(10, 2) NOT NULL
);
DROP TABLE IF EXISTS detalles_pedido_proveedor;
CREATE TABLE detalles_pedido_proveedor (
    id_detalle_proveedor SERIAL PRIMARY KEY,
    pedido_proveedor_id INT REFERENCES pedidos_proveedor(id_pedido_proveedor),
    producto_id INT REFERENCES Productos(id_producto),
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);
DROP TABLE IF EXISTS movimientos_stock;
CREATE TABLE movimientos_stock (
    id_movimiento SERIAL PRIMARY KEY,
    producto_id INT REFERENCES productos(id_producto),
    tipo_movimiento VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL,
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT,
    estado VARCHAR(50) NOT NULL, -- Asegurarse de que esta columna esté definida
    usuario_id INT
);