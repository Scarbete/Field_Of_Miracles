import * as yup from 'yup'

export const createLoginSchema = () =>
    yup.object().shape({
        login: yup
            .string()
            .required('Заполните поле')
            .max(60, 'Мax 60'),
        password: yup
            .string()
            .required('Заполните поле')
            .max(60, 'Мax 60'),
    })