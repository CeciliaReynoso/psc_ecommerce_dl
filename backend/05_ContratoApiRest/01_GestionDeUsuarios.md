# Registro de Usuarios
```yaml
Descripción:
## Registro de clientes
. Interfaz Pública: Los clientes se registran a través de una interfaz pública accesible desde el sitio web del ecommerce

. Categoría automática: Al registrarse, los clientes se asignan automáticamente la categoría "cliente"

. Formulario de Registro: Incluye campos básicos como nombre, email, contraseña, dirección, etc.

## Registro de Personal Interno

. Interfaz Privada: El personal interno se registra a través de una interfaz privada accesible solo para administradores o usuarios autorizados

. Selección de Rol: Al registrar un miembre del personal, se incluye un menú desplegable en el formulario para seleccionar el rol (empleado, administrador, comprador, vendedor)

. Formulario de Registro: Incluye campos como nombre, email, contraseña (encriptada con bcryptjs), rol.

#### Estructura de Tabla de usuarios

Usuarios:
  type: object
  required:
    - email
    - password
    - rol
  properties:
    id:
      type: integer
      description: ID del usuario
    email:
      type: string
      description: Email del usuario
    password:
      type: string
      description: Contraseña encriptada del usuario
    rol:
      type: string
      description: Rol del usuario (cliente, empleado, administrador, comprador, vendedor)
    estado:
      type: string
      description: Estado del usuario (activo, vacaciones)
  example:
    id: 1
    email: usuario@example.com
    password: $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36S4u4a2uF8X1Z1Z1Z1Z1Z1
    rol: cliente
    estado: activo

#### Endpoints para el Registro de Clientes

POST /registro_cliente:
  summary: Registrar un nuevo cliente
  tags: [Usuarios]
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          properties:
            email:
              type: string
              description: Email del cliente
            password:
              type: string
              description: Contraseña del cliente
            nombre:
              type: string
              description: Nombre del cliente
            direccion:
              type: string
              description: Dirección del cliente
  responses:
    201:
      description: Cliente registrado exitosamente
      content:
        application/json:
          schema:
            type: object
            properties:
              id:
                type: integer
                description: ID del cliente
              email:
                type: string
                description: Email del cliente
              rol:
                type: string
                description: Rol del cliente (cliente)
              estado:
                type: string
                description: Estado del cliente (activo)

#### Registro de Clientes
POST /registro_cliente:
  summary: Registrar un nuevo cliente
  tags: [Usuarios]
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          properties:
            email:
              type: string
              description: Email del cliente
            password:
              type: string
              description: Contraseña del cliente
            nombre:
              type: string
              description: Nombre del cliente
            direccion:
              type: string
              description: Dirección del cliente
  responses:
    201:
      description: Cliente registrado exitosamente
      content:
        application/json:
          schema:
            type: object
            properties:
              id:
                type: integer
                description: ID del cliente
              email:
                type: string
                description: Email del cliente
              rol:
                type: string
                description: Rol del cliente (cliente)
              estado:
                type: string
                description: Estado del cliente (activo)


#### Registro de Personal Interno

POST /registro_personal:
  summary: Registrar un nuevo miembro del personal
  tags: [Usuarios]
  requestBody:
    required: true
    content:
      application/json:
        schema:
          type: object
          properties:
            email:
              type: string
              description: Email del miembro del personal
            password:
              type: string
              description: Contraseña del miembro del personal
            rol:
              type: string
              description: Rol del miembro del personal (empleado, administrador, vendedor, comprador)
            estado:
              type: string
              description: Estado del miembro del personal (activo, vacaciones)
  responses:
    201:
      description: Miembro del personal registrado exitosamente
      content:
        application/json:
          schema:
            type: object
            properties:
              id:
                type: integer
                description: ID del miembro del personal
              email:
                type: string
                description: Email del miembro del personal
              rol:
                type: string
                description: Rol del miembro del personal
              estado:
                type: string
                description: Estado del miembro del personal

### Endpoints de Usuarios
tags:
  - name: Usuarios
    description: Gestión de usuarios y perfiles de acceso

paths:
  /usuarios:
    get:
      summary: Obtener la lista de usuarios
      tags: [Usuarios]
      responses:
        200:
          description: Lista de usuarios
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/Usuario'

  /usuarios/{id}:
    get:
      summary: Obtener un usuario por ID
      tags: [Usuarios]
      parameters:
        - in: path
          name: id
          schema:
            type: integer
          required: true
          description: ID del usuario
      responses:
        200:
          description: Usuario encontrado
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Usuario'
        404:
          description: Usuario no encontrado

    post:
      summary: Crear un nuevo usuario
      tags: [Usuarios]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Usuario'
      responses:
        201:
          description: Usuario creado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Usuario'

    put:
      summary: Actualizar un usuario existente
      tags: [Usuarios]
      parameters:
        - in: path
          name: id
          schema:
            type: integer
          required: true
          description: ID del usuario
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Usuario'
      responses:
        200:
          description: Usuario actualizado exitosamente
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Usuario'
        404:
          description: Usuario no encontrado

    delete:
      summary: Eliminar un usuario
      tags: [Usuarios]
      parameters:
        - in: path
          name: id
          schema:
            type: integer
          required: true
          description: ID del usuario
      responses:
        200:
          description: Usuario eliminado exitosamente
        404:
          description: Usuario no encontrado
