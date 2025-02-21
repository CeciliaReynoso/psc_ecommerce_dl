import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import AuthGuard from '../guards/AuthGuard';
import Page404 from '../views/Page404';
import Cart from '../views/Cart';
import Home from '../views/Home';
import HomePerfil from '../views/HomePerfil';
import Admin from '../views/PrivateViews/Admin';
import Login from '../views/Login';
import Profile from '../views/Profile';
import Register from '../views/Register';
import Gallery from '../views/Gallery';
import Detail from '../views/Detail';
import Buyer from '../views/PrivateViews/Buyer';
import Seller from '../views/PrivateViews/Seller';
import UserManagement from '../views/PrivateViews/UserManagement';
import EditUserForm from '../views/PrivateViews/EditUserForm';
import ProductManagement from '../views/PrivateViews/ProductManagement';
import CategoryManagement from '../views/PrivateViews/CategoryManagement';
import SupplierOrders from '../views/PrivateViews/SupplierOrders';
import CustomerOrders from '../views/PrivateViews/CustomerOrders';
import LowStockProducts from '../views/PrivateViews/LowStockProducts';
import IncompleteOrders from '../views/PrivateViews/IncompleteOrders';
import BuyerLayout from '../layouts/BuyerLayout';
import SellerLayout from '../layouts/SellerLayout';
import { ROLES } from '../helpers/roles';
import { RolesProvider } from '../context/RolesContext';
import useAuth from '../hooks/useAuth';
import Proveedores from '../views/PrivateViews/Proveedores';
import Subcategorias from '../views/PrivateViews/Subcategorias';
import NuevoProveedor from '../views/PrivateViews/NuevoProveedor';
import NuevaSubcategoria from '../views/PrivateViews/NuevaSubcategoria';
import NuevoProducto from '../views/PrivateViews/NuevoProducto';
import ProductGallery from '../components/ProductGallery';

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
            <Route path="/cart" element={<Cart />}/>

            <Route path="/" element={!user || user?.rol === ROLES.CLIENTE ? <MainLayout /> : <AdminLayout />}>
              <Route index element={<Home />} />
              <Route path="/cart" element={<Cart />}/>
              <Route path="/profile" element={<AuthGuard allowedRoles={[ROLES.ADMIN, ROLES.COMPRADOR, ROLES.VENDEDOR, ROLES.CLIENTE]}><Profile /></AuthGuard>} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/home-perfil" element={<HomePerfil />} />
              <Route path="/productos-promocion" element={<ProductGallery />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Admin />} />        
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/users/edit-user/:id" element={<EditUserForm />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/products/nuevo" element={<NuevoProducto />} />
              <Route path="/admin/categories" element={<CategoryManagement />} />
              <Route path="/admin/proveedores" element={<Proveedores />} />
              <Route path="/admin/proveedores/nuevo" element={<NuevoProveedor />} />
              <Route path="/admin/subcategorias" element={<Subcategorias />} />
              <Route path="/admin/subcategorias/nueva" element={<NuevaSubcategoria />} />
            </Route>

            <Route path="/buyer" element={<BuyerLayout />}>
              <Route index element={<Buyer />} />
              <Route path="/buyer/orders" element={<SupplierOrders />} />
              <Route path="/buyer/low-stock-products" element={<LowStockProducts />} />
              <Route path="/buyer/proveedores" element={<Proveedores />} />
              <Route path="/buyer/proveedores/nuevo" element={<NuevoProveedor />} />
              <Route path="/buyer/subcategorias" element={<Subcategorias />} />
              <Route path="/buyer/subcategorias/nueva" element={<NuevaSubcategoria />} />
            </Route>

            <Route path="/seller" element={<SellerLayout />}>
              <Route index element={<Seller />} />
              <Route path="/seller/orders" element={<CustomerOrders />} />
              <Route path="/seller/incomplete-orders" element={<IncompleteOrders />} />
            </Route>
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
    </RolesProvider>
  );
};