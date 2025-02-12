-- Crear la tabla Proveedores antes de Productos
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL, -- Este campo debe estar encriptado
    rol VARCHAR(25) NOT NULL,
    nombre VARCHAR(50) NOT NULL AS "Nombre Completo",
    direccion VARCHAR(100) NOT NULL
);

CREATE TABLE Proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    contacto VARCHAR(255),
    direccion TEXT,
    telefono VARCHAR(50),
    email VARCHAR(255)
);

CREATE TABLE Categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

CREATE TABLE Subcategorias (
    id_subcategoria SERIAL PRIMARY KEY,
    id_categoria INT REFERENCES Categorias(id_categoria),
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT
);

CREATE TABLE Productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio_venta DECIMAL(10, 2) NOT NULL,
    precio_costo DECIMAL(10, 2) NOT NULL,
    categoria_id INT REFERENCES Categorias(id_categoria),
    subcategoria_id INT REFERENCES Subcategorias(id_subcategoria),
    stock_actual INT NOT NULL,
    stock_minimo INT NOT NULL,
    proveedor_id INT REFERENCES Proveedores(id_proveedor),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    imagen_url TEXT
);

CREATE TABLE Pedidos (
    id_pedido SERIAL PRIMARY KEY,
    cliente_id INT,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) NOT NULL,
    total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Detalles_Pedido (
    id_detalle SERIAL PRIMARY KEY,
    pedido_id INT REFERENCES Pedidos(id_pedido),
    producto_id INT REFERENCES Productos(id_producto),
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Pedidos_Proveedor (
    id_pedido_proveedor SERIAL PRIMARY KEY,
    proveedor_id INT REFERENCES Proveedores(id_proveedor),
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50) NOT NULL,
    total DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Detalles_Pedido_Proveedor (
    id_detalle_proveedor SERIAL PRIMARY KEY,
    pedido_proveedor_id INT REFERENCES Pedidos_Proveedor(id_pedido_proveedor),
    producto_id INT REFERENCES Productos(id_producto),
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Movimientos_Stock (
    id_movimiento SERIAL PRIMARY KEY,
    producto_id INT REFERENCES Productos(id_producto),
    tipo_movimiento VARCHAR(50) NOT NULL,
    cantidad INT NOT NULL,
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    descripcion TEXT,
    estado VARCHAR(50) NOT NULL, -- Asegurarse de que esta columna esté definida
    usuario_id INT
);