import { FC, FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.tsx'
import { gameActions } from '@/redux/slices/game/gameSlice.ts'

const LetterInputForm: FC = () => {
    const dispatch = useAppDispatch()
    const { letter } = useAppSelector(state => state.game)

    const handleSubmitLetter = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        dispatch(gameActions.submitLetter())
    }

    return (
        <form onSubmit={handleSubmitLetter}>
            <input
                value={letter}
                onChange={(e) => dispatch(gameActions.setLetter(e.target.value))}
                type={'text'}
                placeholder={'Напишите букву'}
                required
                maxLength={1}
            />
            <button>Отправить</button>
        </form>
    )
}

export default LetterInputForm
