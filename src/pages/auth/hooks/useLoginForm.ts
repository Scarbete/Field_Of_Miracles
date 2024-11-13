import { useForm } from 'react-hook-form'
import { createLoginSchema, LoginFormState } from '@/pages/auth/data/forms.ts'
import { yupResolver } from '@hookform/resolvers/yup'

export const useLoginForm = () => useForm<LoginFormState>({
    mode: 'onChange',
    resolver: yupResolver(createLoginSchema()),
    defaultValues: {
        login: '',
        password: '',
    }
})