import { ReactElement, FC } from 'react'
import { useAppSelector } from '@/hooks/redux.tsx'
import { Navigate } from 'react-router-dom'

type Props = {
    element: ReactElement
}

const ProtectedRoute: FC<Props> = ({ element }) => {
    const isAuth = useAppSelector(state => state.auth.isAuth)

    if (!isAuth) return <Navigate to={'/'} replace />

    return element
}

export default ProtectedRoute
