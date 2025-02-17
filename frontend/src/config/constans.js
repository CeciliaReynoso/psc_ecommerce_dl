export const URLBASE = 'http://localhost:3000';

export const ENDPOINT = {
  // Endpoints públicos
  login: `${URLBASE}/login`,
  register: `${URLBASE}/register`,  
  cart: `${URLBASE}/cart`,
  products: `${URLBASE}/productos`, 
  productsFilter:`${URLBASE}/productos/filtros`,
  product: `${URLBASE}/productos/:id`, 

  // Endpoints privados
  users: `${URLBASE}/usuarios`,
  user: `${URLBASE}/usuario`,
  editUserGet: `${URLBASE}/usuarios/editar-usuario`,
  editUser: `${URLBASE}/usuarios`,
  assignRole: `${URLBASE}/usuarios/asignar-rol`,
  categories: `${URLBASE}/categorias`,
  category: `${URLBASE}/categoria`,
  orders: `${URLBASE}/pedidos_proveedor/:id/validar`,  
  supplierOrders: `${URLBASE}/pedidos_proveedor`,
  lowStockProducts: `${URLBASE}/buyer/low-stock-products`,
  proveedores: `${URLBASE}/proveedores`,
  proveedor: `${URLBASE}/proveedores/:id`,
  subcategorias: `${URLBASE}/subcategorias`,
  subcategoria: `${URLBASE}/subcategorias/:id`,
    // Endpoints para productos del administrador
    productosAdmin: `${URLBASE}/productos-admin`,
    productoAdmin: `${URLBASE}/productos-admin/:id`,

  // Agregar los nuevos endpoints necesarios
  createPost: `${URLBASE}/admin/create-post`,
  galleryPosts: `${URLBASE}/admin/gallery-posts`,
  userManagement: `${URLBASE}/admin/users`,
  productManagement: `${URLBASE}/admin/productos`,
  product:`${URLBASE}/admin/productos/:id`,
  categoryManagement: `${URLBASE}/admin/categories`,
  buyerManagement: `${URLBASE}/buyer`,
  sellerManagement: `${URLBASE}/seller`,
  customerOrders: `${URLBASE}/seller/orders`,
  incompleteOrders: `${URLBASE}/seller/incomplete-orders`,
};