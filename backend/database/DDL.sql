-- Active: 1729636694938@@127.0.0.1@5432@petstore

CREATE DATABASE petstore;

\c petstore;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
  id        SERIAL        NOT NULL,
  email     VARCHAR(50)   NOT NULL  UNIQUE,
  password  VARCHAR(60)   NOT NULL,  
  nombre    VARCHAR(50)   NOT NULL,
  direccion VARCHAR(100)  NOT NULL,
  rol       VARCHAR(20)   NOT NULL,
  PRIMARY KEY (id)
);

-- Insertar datos de prueba
INSERT INTO usuarios (email, password, nombre, direccion, rol) VALUES
('comprador@example.com', '$2a$10$4bLWAX0XA7CAl4aTsStW0ulkFO1A.be4mvEB.GWjTddxeAMt8UDhy', 'Empleado Comprador', 'Dirección PetsCareSolutions', 'COMPRADOR');

INSERT INTO usuarios (email, password, nombre, direccion, rol) VALUES
('admin@example.com', '$2a$10$NlLPvl3fKD6Jz/fynEFZOebnQ.klUB6IFbwHZ.vGCES3UPeyf6Rfm', 'Admin', 'Admin Address', 'ADMINISTRADOR');
INSERT INTO usuarios (email, password, nombre, direccion, rol) VALUES
('vendedor@example.com', '$2a$10$8yUn/M7uoBMIL6AO2/Mnl.3vdB.uA954O/e3OnHuwtPJCmnAcnomC', 'Empleado Vendedor', 'Dirección PetsCareSolutions of 2', 'VENDEDOR');