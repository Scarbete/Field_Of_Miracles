import { FC } from 'react'
import Header from '@/components/base/header/Header.tsx'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {

    return (
        <div>
            <Header/>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

export default Layout