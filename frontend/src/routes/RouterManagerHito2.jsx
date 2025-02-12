import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import AuthGuard from '../guards/AuthGuard';
import Page404 from '../views/Page404';
import Cart from '../views/Cart';
import Home from '../views/Home';
import HomePerfil from '../views/HomePerfil';
import Login from '../views/Login';
import Profile from '../views/Profile';
import Register from '../views/Register';
import Gallery from '../views/Gallery';
import Detail from '../views/Detail';
import Buyer from '../views/PrivateViews/Buyer';
import Seller from '../views/PrivateViews/Seller';
import UserManagement from '../views/PrivateViews/UserManagement';
import ProductManagement from '../views/PrivateViews/ProductManagement';
import CategoryManagement from '../views/PrivateViews/CategoryManagement';
import SupplierOrders from '../views/PrivateViews/SupplierOrders'; // Asegúrate de importar SupplierOrders
import CustomerOrders from '../views/PrivateViews/CustomerOrders';
import LowStockProducts from '../views/PrivateViews/LowStockProducts';
import IncompleteOrders from '../views/PrivateViews/IncompleteOrders';
import CreatePost from '../views/PrivateViews/CreatePost';
import GalleryPosts from '../views/PrivateViews/GalleryPost'; // Asegúrate de importar GalleryPosts
import { ROLES } from '../helpers/roles';
import { RolesProvider } from '../context/RolesContext';
import useAuth from '../hooks/useAuth';

export const RouterManager = () => {
  const { user } = useAuth();

  return (
    <RolesProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="*" element={<Page404 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={!user || user?.rol === ROLES.CLIENTE ? <MainLayout /> : <AdminLayout />}>
              <Route index element={<Home />} />
              <Route path="/cart" element={<AuthGuard allowedRoles={[ROLES.CLIENTE]}><Cart /></AuthGuard>} />
              <Route path="/profile" element={<AuthGuard allowedRoles={[ROLES.ADMIN, ROLES.COMPRADOR, ROLES.VENDEDOR, ROLES.CLIENTE]}><Profile /></AuthGuard>} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/home-perfil" element={<HomePerfil />} />
              <Route path="/admin/users" element={<AuthGuard allowedRoles={[ROLES.ADMIN]}><UserManagement /></AuthGuard>} />
              <Route path="/admin/products" element={<AuthGuard allowedRoles={[ROLES.ADMIN]}><ProductManagement /></AuthGuard>} />
              <Route path="/admin/categories" element={<AuthGuard allowedRoles={[ROLES.ADMIN]}><CategoryManagement /></AuthGuard>} />
              <Route path="/admin/create-post" element={<AuthGuard allowedRoles={[ROLES.ADMIN]}><CreatePost /></AuthGuard>} />
              <Route path="/admin/gallery" element={<AuthGuard allowedRoles={[ROLES.ADMIN]}><GalleryPosts /></AuthGuard>} />
            </Route>

            <Route path="/buyer" element={<AuthGuard allowedRoles={[ROLES.COMPRADOR]}><AdminLayout /></AuthGuard>}>
              <Route index element={<Buyer />} />
              <Route path="orders" element={<SupplierOrders />} />
              <Route path="low-stock-products" element={<LowStockProducts />} />
            </Route>

            <Route path="/seller" element={<AuthGuard allowedRoles={[ROLES.VENDEDOR]}><AdminLayout /></AuthGuard>}>
              <Route index element={<Seller />} />
              <Route path="orders" element={<CustomerOrders />} />
              <Route path="incomplete-orders" element={<IncompleteOrders />} />
            </Route>
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    </RolesProvider>
  );
};
