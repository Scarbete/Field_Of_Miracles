import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.tsx'
import { gameActions } from '@/redux/slices/game/gameSlice.ts'
import LetterInputForm from '@/components/ui/LetterInputForm/LetterInputForm'
import DisplayedWord from '@/components/ui/DisplayedWord/DisplayedWord'
import WordInputForm from '@/components/ui/WordInputForm/WordInputForm'
import styles from './MainPage.module.scss'

const MainPage: FC = () => {
    const dispatch = useAppDispatch()
    const { currentQuestion, allQuestionsCompleted } = useAppSelector(state => state.game)

    useEffect(() => {
        dispatch(gameActions.setRandomQuestion())
    }, [dispatch, currentQuestion])

    if (allQuestionsCompleted && !currentQuestion) {
        return <div className={styles.winner}>
            Вопросов не осталось, вы выиграли!
        </div>
    }

    return (
        <div className={styles.main}>
            <h1>Поле чудес</h1>
            <h2>Вопрос: {currentQuestion?.question}</h2>
            <div className={styles.questionBlock}>
                <LetterInputForm />
                <DisplayedWord />
                <WordInputForm />
            </div>
        </div>
    )
}

export default MainPage