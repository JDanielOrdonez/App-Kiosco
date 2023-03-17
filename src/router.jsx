import { createBrowserRouter } from 'react-router-dom';
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import Inicio from './views/inicio';
import Login from './views/login';
import Registro from './views/Registro';
import AdminLayout from './layouts/AdminLayout';
import Ordenes from './views/Ordenes';
import Productos from './views/Productos';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children : [
            {
                // index: true,
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            }
        ]
    },{
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Ordenes/> 
            },
            {
                path: '/admin/productos',
                element: <Productos />
            }
        ]   
    }
])

export default router