import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.tsx'
import { authActions } from '@/redux/slices/auth/authSlice.ts'
import InputField from '@/components/ui/InputField/InputField'
import { LoginFormState, useLoginForm } from '@/pages/auth'
import styles from './loginPage.module.scss'


const LoginPage: FC = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(state => state.auth.isAuth)

    const {
        control,
        handleSubmit,
        formState: { errors },
        setError,
        reset
    } = useLoginForm()

    const loginSubmit = (data: LoginFormState) => {
        dispatch(authActions.loginUser({
            ...data, setError, reset
        }))
    }

    return (
        <div className={styles.loginPage}>
            <h2>Login</h2>
            <p>
                {isAuth
                    ? 'Вы успешно авторизовались и вы можете перейти на страницу Admin'
                    : 'Вы можете авторизоваться и зайти в админ панель'
                }
            </p>
            <form onSubmit={handleSubmit(loginSubmit)}>
                <InputField
                    control={control}
                    name={'login'}
                    placeholder={'Enter login'}
                    error={errors.login?.message}
                />
                <InputField
                    control={control}
                    name={'password'}
                    placeholder={'Enter password'}
                    error={errors.password?.message}
                />
                <button>login</button>
            </form>
        </div>
    )
}

export default LoginPage