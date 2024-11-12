import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '@/components/base/authguard/ProtectedRoute.tsx'
import Layout from '@/components/base/layout/Layout.tsx'
import MainPage from '@/pages/main/MainPage.tsx'
import { LoginPage } from '@/pages/auth'
import AdminPage from '@/pages/admin/AdminPage.tsx'

export const enum EnumPaths {
    MAIN = 'main',
    LOGIN = 'login',
    ADMIN = 'admin',
}

export const paths: Record<EnumPaths, string> = {
    [EnumPaths.MAIN]: '/',
    [EnumPaths.LOGIN]: '/login',
    [EnumPaths.ADMIN]: '/admin',
}

export const routeConfig = createBrowserRouter([
    {
        path: paths[EnumPaths.MAIN],
        element: <Layout/>,
        children: [
            {
                path: paths[EnumPaths.MAIN],
                element: <MainPage/>
            },
            {
                path: paths[EnumPaths.LOGIN],
                element: <LoginPage/>
            },
            {
                path: paths[EnumPaths.ADMIN],
                element: <ProtectedRoute element={<AdminPage/>} />
            },
        ]
    }
])