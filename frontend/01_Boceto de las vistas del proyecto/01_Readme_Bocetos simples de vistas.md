# Requisitos a cumplir:

Definir la navegación entre vistas marcando las públicas y las privadas.

### Página Principal (Vista Pública)
- **Componentes**:
  - Barra de navegación con enlaces a las diferentes secciones (Inicio, Registro, Inicio de sesión, Mi perfil, Carrito de compras)
  - Sección hero con una imagen destacada o un banner
  - Sección de publicaciones recientes o destacadas
  - Pie de página con información de contacto y enlaces a redes sociales

### Boceto simple de la Página Principal

```plaintext
+------------------------------------------------------+
| Barra de Navegación                                  |
| [Inicio] [Registro] [Inicio de sesión] [Mi perfil]   |
| [Carrito de compras]                                 |
+------------------------------------------------------+
| Sección Hero                                         |
| [Imagen Destacada o Banner]                          |
| [Texto Promocional]                                  |
+------------------------------------------------------+
| Publicaciones Recientes o Destacadas                 |
| [Publicación 1] [Publicación 2] [Publicación 3]      |
+------------------------------------------------------+
| Pie de Página                                        |
| [Contacto] [Redes Sociales]                          |
+------------------------------------------------------+
```

### Barra de Navegación (Pública)
```plaintext
+------------------------------------------------------+
| Barra de Navegación                                  |
| [Inicio] [Registro] [Inicio de sesión] [Mi perfil]   |
| [Carrito de compras]                                 |
+------------------------------------------------------+
```

### Sección Hero
```plaintext
+------------------------------------------------------+
| Sección Hero                                         |
| [Imagen Destacada o Banner]                          |
| [Texto Promocional]                                  |
+------------------------------------------------------+
```

### Publicaciones Recientes o Destacadas
```plaintext
+------------------------------------------------------+
| Publicaciones Recientes o Destacadas                 |
| [Publicación 1] [Publicación 2] [Publicación 3]      |
+------------------------------------------------------+
```

### Pie de Página
```plaintext
+------------------------------------------------------+
| Pie de Página                                        |
| [Contacto] [Redes Sociales]                          |
+------------------------------------------------------+
```

### Esquema de Navegación 
``
#### Vistas Públicas:
```yaml
1. Página Principal
2. Registro de Usuarios
3. Inicio de Sesión
4. Carrito de Compras

#### Vistas Privadas (Autenticación Requerida):
```yaml
Para Todos los Usuarios Autenticados:
4. Mi Perfil
5. Formulario para Crear una Publicación
6. Galería de Publicaciones
7. Vista de Detalle de una Publicación

Para el Administrador:
8. Administración de Usuarios
9. Administración de Productos
10. Administración de Categorías y Subcategorías

Para el Comprador:
11. Gestión de Pedidos a Proveedor
12. Listado de Productos con Stock Mínimo

Para el Vendedor:
13. Gestión de Pedidos de Cliente
14. Listado de Pedidos No Completados
```

### Ejemplo de Boceto de Navegación

#### Barra de Navegación (Pública)
```plaintext
+------------------------------------------------------+
| Barra de Navegación                                  |
| [Inicio] [Registro] [Inicio de sesión]               |
+------------------------------------------------------+
```

#### Barra de Navegación (Privada)
```plaintext
+------------------------------------------------------+
| Barra de Navegación                                  |
| [Inicio] [Mi perfil] [Cerrar sesión]                 |
| [Administración] (Solo para Administrador)           |
| [Gestión de Pedidos a Proveedor] (Solo para Comprador)|
| [Gestión de Pedidos de Cliente] (Solo para Vendedor) |
+------------------------------------------------------+
```

### Detalle de Vistas Privadas

#### Administración de Usuarios (Administrador)
```plaintext
+------------------------------------------------------+
| Administración de Usuarios                           |
| [Crear Usuario] [Editar Usuario] [Eliminar Usuario]  |
| Lista de Usuarios                                    |
+------------------------------------------------------+
```

#### Gestión de Pedidos a Proveedor (Comprador)
```plaintext
+------------------------------------------------------+
| Gestión de Pedidos a Proveedor                       |
| [Crear Pedido] [Editar Pedido] [Completar Pedido]    |
| Lista de Pedidos a Proveedor                         |
+------------------------------------------------------+
```

#### Gestión de Pedidos de Cliente (Vendedor)
```plaintext
+------------------------------------------------------+
| Gestión de Pedidos de Cliente                        |
| [Cambiar Estado de Pedido]                           |
| Lista de Pedidos No Completados                      |
+------------------------------------------------------+
```

