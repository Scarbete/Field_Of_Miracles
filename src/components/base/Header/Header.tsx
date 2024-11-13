import { FC } from 'react'
import { EnumPaths, paths } from '@/routes/routeConfig.tsx'
import { NavLink } from 'react-router-dom'
import Container from '@/components/ui/Container/Container.tsx'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.tsx'
import Logo from '@/assets/images/vite.svg'
import { authActions } from '@/redux/slices/auth/authSlice.ts'
import styles from './Header.module.scss'


const Header: FC = () => {
    const entryPaths = Object.entries(paths)
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const filteredPaths = isAuth
        ? entryPaths
        : entryPaths.filter(([key]) => key !== EnumPaths.ADMIN)

    return (
        <header className={styles.header}>
            <Container className={styles.container}>
                <NavLink to={paths.main}>
                    <img src={Logo} alt={'Logo'} />
                </NavLink>
                <nav>
                    <ul>
                        {filteredPaths.map(([ key, value ]) => (
                            <li key={key}>
                                <NavLink to={value}>
                                    {key}
                                </NavLink>
                            </li>
                        ))}
                        {isAuth && (
                            <li onClick={() => dispatch(authActions.logoutUser())}>
                                <button>
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header