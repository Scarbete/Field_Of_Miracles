import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.tsx'
import { useForm } from 'react-hook-form'
import InputField from '@/components/ui/InputField/InputField'
import { gameActions } from '@/redux/slices/game/gameSlice.ts'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './AdminPage.module.scss'

type QuestionFormState = {
    answer: string
    question: string
}

const createQuestionFormSchema = () =>
    yup.object().shape({
        answer: yup
            .string()
            .required('Заполните поле')
            .max(60, 'Мax 60'),
        question: yup
            .string()
            .required('Заполните поле')
            .max(60, 'Мax 60'),
    })

const AdminPage: FC = () => {
    const dispatch = useAppDispatch()
    const { questions, allQuestionsCompleted } = useAppSelector(state => state.game)

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<QuestionFormState>({
        mode: 'onChange',
        resolver: yupResolver(createQuestionFormSchema()),
        defaultValues: {
            answer: '',
            question: '',
        }
    })

    const addQuestion = (data: QuestionFormState) => {
        const newQuestion = {
            ...data,
            id: Date.now(),
            completed: false
        }
        dispatch(gameActions.addQuestion(newQuestion))

        if (!questions.length && !allQuestionsCompleted) {
            dispatch(gameActions.setAllQuestionsCompleted(true))
        }

        reset()
    }

    return (
        <div className={styles.admin}>
            <h2>Админ панель</h2>
            <form onSubmit={handleSubmit(addQuestion)}>
                <InputField
                    control={control}
                    name={'question'}
                    placeholder={'Введите вопрос'}
                    error={errors.question?.message}
                />
                <InputField
                    control={control}
                    name={'answer'}
                    placeholder={'Введите ответ для вопроса'}
                    error={errors.answer?.message}
                />
                <button>Добавить вопрос</button>
            </form>
            <ul>
                {questions.length > 0
                    ? questions.map((item) => (
                        <li key={item.id}>
                            <h3>
                                answer: {item.answer}
                                <button onClick={() => dispatch(gameActions.editAnswer(item.id))}>
                                    редактировать
                                </button>
                            </h3>
                            <p>
                                question: {item.question}
                                <button onClick={() => dispatch(gameActions.editQuestion(item.id))}>
                                    редактировать
                                </button>
                            </p>
                            <span>
                                completed:
                                <button onClick={() => dispatch(gameActions.toggleQuestionCompleted(item.id))}>
                                    {`${item.completed}`}
                                </button>
                            </span>
                            <p>
                                <button onClick={() => dispatch(gameActions.deleteQuestion(item.id))}>
                                    удалить
                                </button>
                            </p>
                        </li>
                    ))
                    : <li>Вопросов нет</li>
                }
            </ul>
        </div>
    )
}

export default AdminPage