import { combineReducers } from '@reduxjs/toolkit'
import { authReducer } from '@/redux/slices/auth/authSlice.ts'
import { gameReducer } from '@/redux/slices/game/gameSlice.ts'

export const rootReducer = combineReducers({
    auth: authReducer,
    game: gameReducer,
})