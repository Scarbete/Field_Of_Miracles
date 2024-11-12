
export type GameState = {
    questions: GameQuestion[]
    currentQuestion: GameQuestion | null
    allQuestionsCompleted: boolean
    displayedWord: string[]
    answeredLetters: string[]
    letter: string
    wordAnswer: string
}

export type GameQuestion = {
    question: string
    answer: string
    completed: boolean
    id: number
}