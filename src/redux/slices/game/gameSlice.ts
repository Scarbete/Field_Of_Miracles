import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { alertToast } from '@/utils/libs/alertToast.ts'
import { GameQuestion, GameState } from './gameTypes'

const name = 'game'

const updateQuestionCompletion = (questions: GameQuestion[], questionId: number) => {
    return questions.map(item =>
        item.id === questionId ? { ...item, completed: true } : item
    )
}

const initialState: GameState = {
    questions: JSON.parse(localStorage.getItem('questions') ?? '[]'),
    currentQuestion: null,
    allQuestionsCompleted: JSON.parse(localStorage.getItem('allQuestions') ?? 'false'),
    displayedWord: [],
    answeredLetters: [],
    letter: '',
    wordAnswer: ''
}

const { actions: gameActions, reducer: gameReducer } = createSlice({
    name,
    initialState,
    reducers: {
        setRandomQuestion(state) {
            // получаем тут вопросы у которых поле completed === false
            const incompleteQuestions = state.questions.filter(question => !question.completed)

            if (incompleteQuestions.length > 0) {
                // выбираем случайный вопрос
                const randomIndex = Math.floor(Math.random() * incompleteQuestions.length)
                state.currentQuestion = incompleteQuestions[randomIndex]
                state.allQuestionsCompleted = false
                localStorage.setItem('allQuestions', JSON.stringify(false))
            }
            else {
                // если вопросов не осталось то игрок выиграл
                if (!state.allQuestionsCompleted) {
                    alertToast('success', 'Поздравляем, вы выиграли!')
                    state.currentQuestion = null
                    state.allQuestionsCompleted = true
                    state.answeredLetters = []
                    localStorage.setItem('allQuestions', JSON.stringify(true))
                }
            }
        },
        setLetter: (state, action: PayloadAction<string>) => {
            state.letter = action.payload
        },
        setWordAnswer: (state, action: PayloadAction<string>) => {
            state.wordAnswer = action.payload
        },
        setDisplayedWord: (state, action: PayloadAction<string[]>) => {
            state.displayedWord = action.payload
        },
        submitLetter: (state) => {
            const answer = state.currentQuestion?.answer
            if (!answer) return

            const guessedLetter = state.letter.toLowerCase()

            if (state.answeredLetters.includes(guessedLetter)) {
                alertToast('error', 'Вы уже угадали эту букву!')
            }
            else if (answer.toLowerCase().includes(guessedLetter)) {
                // В блоке отображаемых букв вместо символа *
                // ставим букву и добавляем букву в массив уже отгаданных букв
                alertToast('success', `Вы угадали букву: ${guessedLetter}`)
                state.displayedWord = state.displayedWord.map((char, index) =>
                    answer[index].toLowerCase() === guessedLetter ? guessedLetter : char
                )
                state.answeredLetters.push(guessedLetter)

                if (state.displayedWord.join('') === answer.toLowerCase()) {
                    // если слово полностью отгадано то изменяем поле completed у вопроса
                    // и изменяем currentQuestion что приводит к срабатыванию useEffect в mainPage
                    alertToast('success', 'Поздравляем, вы угадали!')
                    if (state.currentQuestion) {
                        state.questions = updateQuestionCompletion(state.questions, state.currentQuestion.id)
                        state.currentQuestion.completed = true
                        localStorage.setItem('questions', JSON.stringify(state.questions))
                    }
                }
            }
            else {
                alertToast('error', 'Вы ошиблись с буквой')
            }
            state.letter = ''
        },
        submitWordAnswer: (state) => {
            const answer = state.currentQuestion?.answer
            if (!answer) return

            if (state.wordAnswer.toLowerCase() === answer.toLowerCase()) {
                alertToast('success', 'Поздравляем, вы угадали слово!')
                if (state.currentQuestion) {
                    // если слово полностью отгадано то изменяем поле completed у вопроса
                    // и изменяем currentQuestion что приводит к срабатыванию useEffect в mainPage
                    state.questions = updateQuestionCompletion(state.questions, state.currentQuestion.id)
                    state.currentQuestion.completed = true
                    localStorage.setItem('questions', JSON.stringify(state.questions))
                }
            }
            else {
                alertToast('error', 'Неправильно, попробуйте снова!')
            }
            state.wordAnswer = ''
        },
        setAllQuestionsCompleted: (state, action: PayloadAction<boolean>) => {
            state.allQuestionsCompleted = action.payload
            localStorage.setItem('allQuestions', JSON.stringify(action.payload))
        },
        addQuestion: (state, action: PayloadAction<GameQuestion>) => {
            state.questions.push(action.payload)
            localStorage.setItem('questions', JSON.stringify(state.questions))
        },
        toggleQuestionCompleted: (state, action: PayloadAction<number>) => {
            state.questions = state.questions.map((item) => item.id === action.payload
                ? {...item, completed: !item.completed}
                : item
            )
            localStorage.setItem('questions', JSON.stringify(state.questions))
        },
        deleteQuestion: (state, action: PayloadAction<number>) => {
            state.questions = state.questions.filter(item => item.id !== action.payload)
            localStorage.setItem('questions', JSON.stringify(state.questions))
        },
        editQuestion: (state, action: PayloadAction<number>) => {
            const newQuestion = prompt('Enter new text for this question')
            state.questions = state.questions.map(item => item.id === action.payload
                ? {...item, question: newQuestion ?? ''}
                : item
            )
            localStorage.setItem('questions', JSON.stringify(state.questions))
        },
        editAnswer: (state, action: PayloadAction<number>) => {
            const newAnswer = prompt('Enter new text for this answer')
            state.questions = state.questions.map(item => item.id === action.payload
                ? {...item, answer: newAnswer ?? ''}
                : item
            )
            localStorage.setItem('questions', JSON.stringify(state.questions))
        },
    },
})

export {
    gameActions,
    gameReducer
}