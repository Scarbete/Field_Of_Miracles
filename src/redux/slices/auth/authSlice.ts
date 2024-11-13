import { createSlice } from '@reduxjs/toolkit'
import { alertToast } from '@/utils/libs/alertToast.ts'
import { AuthFormState } from '@/redux/slices/auth/authTypes.ts'


const name = 'authSlice'

type AuthState = {
    isAuth: boolean,
    userData: null | AuthFormState
}

const initialState: AuthState = {
    isAuth: JSON.parse(localStorage.getItem('auth') ?? 'false'),
    userData: null
}


export const { actions: authActions, reducer: authReducer } = createSlice({
    name,
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const { login, password, setError, reset } = action.payload

            if (login === 'admin' && password === '123') {
                alertToast('success', 'success login')
                state.isAuth = true
                localStorage.setItem('auth', JSON.stringify(true))
                reset()
            }
            else {
                setError('login', {
                    type: 'manual',
                    message: 'Неверный логин или пароль'
                })
                setError('password', {
                    type: 'manual',
                    message: 'Неверный логин или пароль'
                })
            }
        },
        logoutUser(state) {
            alertToast('success', 'Вы вышли из аккаунта')
            state.isAuth = false
            localStorage.setItem('auth', JSON.stringify(false))
        },
    }
})