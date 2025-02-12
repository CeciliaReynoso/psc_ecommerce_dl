-- Active: 1729636694938@@127.0.0.1@5432@petstore
\c petstore;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id        SERIAL        NOT NULL,
  email     VARCHAR(50)   NOT NULL  UNIQUE,
  password  VARCHAR(60)   NOT NULL,
  rol       VARCHAR(25)   NOT NULL,
  nombre    VARCHAR(50)   NOT NULL,
  direccion VARCHAR(100)  NOT NULL,
  PRIMARY KEY (id)
);

-- Insertar datos de prueba
INSERT INTO usuarios (email, password, rol, nombre, direccion) VALUES
('cliente1@example.com', '$2a$10$7QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8', 'Cliente', 'Cliente Uno', 'Dirección 1'),
('cliente2@example.com', '$2a$10$7QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8', 'Cliente', 'Cliente Dos', 'Dirección 2'),
('cliente3@example.com', '$2a$10$7QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8', 'Cliente', 'Cliente Tres', 'Dirección 3'),
('cliente4@example.com', '$2a$10$7QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8', 'Cliente', 'Cliente Cuatro', 'Dirección 4'),
('cliente5@example.com', '$2a$10$7QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8', 'Cliente', 'Cliente Cinco', 'Dirección 5'),
('empleado1@example.com', '$2a$10$7QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8QJ8', 'Empleado', 'Empleado Uno', 'Dirección 6');

INSERT INTO usuarios (email, password, rol, nombre, direccion) VALUES
('admin@example.com', '$2a$10$NlLPvl3fKD6Jz/fynEFZOebnQ.klUB6IFbwHZ.vGCES3UPeyf6Rfm', 'Administrador', 'Admin', 'Admin Address');