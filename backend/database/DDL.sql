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

