import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { alertToast } from '@/utils/libs/alertToast.ts'
import { GameQuestion, GameState } from './gameTypes'


const name = 'game'

const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue))
}

const saveToLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}

const updateQuestionCompletion = (questions: GameQuestion[], questionId: number) => {
    return questions.map(item =>
        item.id === questionId ? { ...item, completed: true } : item
    )
}

const initialState: GameState = {
    questions: loadFromLocalStorage('questions', []),
    currentQuestion: null,
    allQuestionsCompleted: loadFromLocalStorage('allQuestions', false),
    displayedWord: [],
    answeredLetters: [],
    letter: '',
    wordAnswer: ''
}


export const { actions: gameActions, reducer: gameReducer } = createSlice({
    name,
    initialState,
    reducers: {
        setRandomQuestion(state) {
            const incompleteQuestions = state.questions.filter(question => !question.completed)

            if (incompleteQuestions.length > 0) {
                const randomIndex = Math.floor(Math.random() * incompleteQuestions.length)
                state.currentQuestion = incompleteQuestions[randomIndex]
                state.allQuestionsCompleted = false
                saveToLocalStorage('allQuestions', false)
            }
            else if (!state.allQuestionsCompleted) {
                alertToast('success', 'Поздравляем, вы выиграли!')
                state.currentQuestion = null
                state.allQuestionsCompleted = true
                state.answeredLetters = []
                saveToLocalStorage('allQuestions', true)
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
                alertToast('success', `Вы угадали букву: ${guessedLetter}`)
                state.displayedWord = state.displayedWord.map((char, index) =>
                    answer[index].toLowerCase() === guessedLetter ? guessedLetter : char
                )
                state.answeredLetters.push(guessedLetter)

                if (state.displayedWord.join('') === answer.toLowerCase()) {
                    alertToast('success', 'Поздравляем, вы угадали!')
                    if (state.currentQuestion) {
                        state.questions = updateQuestionCompletion(state.questions, state.currentQuestion.id)
                        state.currentQuestion.completed = true
                        saveToLocalStorage('questions', state.questions)
                    }
                }
            }
            else alertToast('error', 'Вы ошиблись с буквой')
            state.letter = ''
        },
        submitWordAnswer: (state) => {
            const answer = state.currentQuestion?.answer
            if (!answer) return

            if (state.wordAnswer.toLowerCase() === answer.toLowerCase()) {
                alertToast('success', 'Поздравляем, вы угадали слово!')
                if (state.currentQuestion) {
                    state.questions = updateQuestionCompletion(state.questions, state.currentQuestion.id)
                    state.currentQuestion.completed = true
                    saveToLocalStorage('questions', state.questions)
                }
            }
            else alertToast('error', 'Неправильно, попробуйте снова!')
            state.wordAnswer = ''
        },
        setAllQuestionsCompleted: (state, action: PayloadAction<boolean>) => {
            state.allQuestionsCompleted = action.payload
            saveToLocalStorage('allQuestions', action.payload)
        },
        addQuestion: (state, action: PayloadAction<GameQuestion>) => {
            state.questions.push(action.payload)
            saveToLocalStorage('questions', state.questions)
        },
        toggleQuestionCompleted: (state, action: PayloadAction<number>) => {
            state.questions = state.questions.map((item) => item.id === action.payload
                ? {...item, completed: !item.completed}
                : item
            )
            saveToLocalStorage('questions', state.questions)
        },
        deleteQuestion: (state, action: PayloadAction<number>) => {
            state.questions = state.questions.filter(item => item.id !== action.payload)
            saveToLocalStorage('questions', state.questions)
        },
        editQuestion: (state, action: PayloadAction<number>) => {
            const newQuestion = prompt('Enter new text for this question')
            state.questions = state.questions.map(item => item.id === action.payload
                ? {...item, question: newQuestion ?? ''}
                : item
            )
            saveToLocalStorage('questions', state.questions)
        },
        editAnswer: (state, action: PayloadAction<number>) => {
            const newAnswer = prompt('Enter new text for this answer')
            state.questions = state.questions.map(item => item.id === action.payload
                ? {...item, answer: newAnswer ?? ''}
                : item
            )
            saveToLocalStorage('questions', state.questions)
        },
    },
})