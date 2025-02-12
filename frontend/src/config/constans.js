import UserManagement from "../views/PrivateViews/UserManagement";

export const URLBASE = 'http://localhost:3000';

export const ENDPOINT = {
  // Endpoints públicos
  login: `${URLBASE}/login`,
  register: `${URLBASE}/register`,  
  cart: `${URLBASE}/cart`,

  // Endpoints privados
  users: `${URLBASE}/usuarios`,
  user: `${URLBASE}/usuario`,
  products: `${URLBASE}/productos`,
  product: `${URLBASE}/producto`,
  categories: `${URLBASE}/categorias`,
  category: `${URLBASE}/categoria`,
  personal: `${URLBASE}/register-personal`,

  // Agregar los nuevos endpoints necesarios
  createPost: `${URLBASE}/admin/create-post`,
  galleryPosts: `${URLBASE}/admin/gallery-posts`,
  userManagement: `${URLBASE}/admin/users`,
  productManagement: `${URLBASE}/admin/products`,
  categoryManagement: `${URLBASE}/admin,categories`,
  buyerManagement: `${URLBASE}/buyer`,
  sellerManagement: `${URLBASE}/seller`,
  supplierOrders: `${URLBASE}/buyer/orders`,
  lowStockProducts: `${URLBASE}/buyer/low-stock-products`,
  customerOrders: `${URLBASE}/seller/orders`,
  incompleteOrders: `${URLBASE}/seller/incomplete-orders`,
};
