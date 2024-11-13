import { FC, Suspense } from 'react'
import Header from '@/components/base/Header/Header.tsx'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {

    return (
        <Suspense fallback={<div>Suspense...</div>}>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </Suspense>
    )
}

export default Layout