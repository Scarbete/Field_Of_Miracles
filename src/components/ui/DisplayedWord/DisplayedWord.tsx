import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.tsx'
import { gameActions } from '@/redux/slices/game/gameSlice.ts'
import styles from './DisplayedWord.module.scss'

const DisplayedWord: FC = () => {
    const dispatch = useAppDispatch()
    const { displayedWord, currentQuestion } = useAppSelector(state => state.game)

    useEffect(() => {
        if (currentQuestion?.answer?.length) {
            dispatch(gameActions.setDisplayedWord(
                new Array(currentQuestion?.answer?.length).fill('*')
            ))
        }
    }, [currentQuestion?.answer])

    return (
        <div className={styles.wordsView}>
            {displayedWord.map((char, index) => (
                <div key={index} className={styles.wordBlock}>
                    {char}
                </div>
            ))}
        </div>
    )
}

export default DisplayedWord
