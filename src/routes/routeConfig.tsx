import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from '@/components/base/ProtectedRoute/ProtectedRoute.tsx'
import Layout from '@/components/base/Layout/Layout.tsx'
import { MainPage } from '@/pages/main'
import { LoginPage } from '@/pages/auth'
import { AdminPage } from '@/pages/admin'

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