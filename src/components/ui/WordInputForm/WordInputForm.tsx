import { FC, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.tsx'
import { gameActions } from '@/redux/slices/game/gameSlice.ts'

const WordInputForm: FC = () => {
    const dispatch = useAppDispatch()
    const { wordAnswer } = useAppSelector(state => state.game)

    const handleSubmitWordAnswer = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(gameActions.submitWordAnswer())
    }

    return (
        <form onSubmit={handleSubmitWordAnswer}>
            <input
                value={wordAnswer}
                onChange={(e) => dispatch(gameActions.setWordAnswer(e.target.value))}
                type={'text'}
                placeholder={'Введите целое слово'}
                required
            />
            <button>Отправить</button>
        </form>
    )
}

export default WordInputForm
