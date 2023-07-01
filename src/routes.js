import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';

// import PosPage from './pages/PosPage';
import PurchasePage from './pages/PurchasePages';
import AdminPages from './pages/AdminPages';
import InvoicePages from './pages/Invoices';
import InventoryPages from './pages/InventoryPages';
import { ProtectedRoute } from './components/ProtectedRoute';

import CuentasxPages from './pages/CuentasxcPages';
import UserSystemPage from './pages/UserSystemPages';
import SellerPage from './pages/SellerPage';
import SubModulePages from './pages/SubModulePages';
import CustomerPages from './pages/Customerpages';
import { Purchases } from './sections/@dashboard/Purchases';
import { TablePurchases } from './sections/@dashboard/TablePurchases';
import { TableSupplier } from './sections/@dashboard/TableSupplier';
import PosPageA from './pages/PospageA';
import ProductDPages from './pages/ProductDPages';
import DevolutionPages from './pages/DevolutionsPages';
import ReportPages from './pages/ReportPages';

import { CustomerPerfil } from './sections/@dashboard/CustomerPerfil';
import UploadProductPages from './pages/UploadProductPages';

// ----------------------------------------------------------------------


const user = JSON.parse(localStorage.getItem("user"));
console.log("user")
export default function Router() {
  const isLoggedIn = !!user; // Verificar si el usuario está registrado
  const redirectPath = isLoggedIn ? "/dashboard" : "/login"; // Determinar la ruta de redirección



  const routes = useRoutes([
    {
      path: '/dashboard',
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" replace />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        {path:"user", element: <ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }> <UserPage/></ProtectedRoute> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        // { path: 'facturacion', element: <ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }>  <PosPage /></ProtectedRoute> },
        { path: 'Compras', element:<ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }>  <PurchasePage /></ProtectedRoute>  },
        { path: 'Administracion', element:<ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }> <AdminPages /></ProtectedRoute >},
        { path: 'invoice', element:<ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }> <InvoicePages /></ProtectedRoute> },
        { path: 'inventario', element:<ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }> <InventoryPages /></ProtectedRoute> },
        { path: 'cuentasxc', element:<ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }> <CuentasxPages /></ProtectedRoute> },
        { path: 'usuarios', element:<ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }> <UserSystemPage /></ProtectedRoute> },
        { path: 'vendedores', element:<ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }> <SellerPage /></ProtectedRoute> },
        { path: 'submodule', element:<ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }> <SubModulePages /></ProtectedRoute> },
        { path: 'clientes', element:<ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }> <CustomerPages /></ProtectedRoute> },
        { path: 'cargar-compras', element:<ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }> <Purchases /></ProtectedRoute> },
        { path: 'lista-compras', element:<ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }> <TablePurchases/></ProtectedRoute> },
        { path: 'lista-proveedores', element:<ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }> <TableSupplier/></ProtectedRoute> },
        { path: 'facturacionA', element: <ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }>  <PosPageA /></ProtectedRoute> },
        { path: 'productos-defectuosos', element: <ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }>  <ProductDPages /></ProtectedRoute> },
        { path: 'devoluciones-venta', element: <ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }>  <DevolutionPages/></ProtectedRoute> },
        { path: 'reportes', element: <ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }>  <ReportPages/></ProtectedRoute> },
        { path: 'perfil-cliente/:id', element: <ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }>  <CustomerPerfil/></ProtectedRoute> },
        { path: 'cargar-productos', element: <ProtectedRoute isAllowed={!!user && user.roles.includes('ROLE_ADMIN') }>  <UploadProductPages/></ProtectedRoute> },
      ],
    },

    {
      path: "login",
      element: isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
