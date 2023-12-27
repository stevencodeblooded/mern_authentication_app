import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/authSlice.js'

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableChek : false
    }),
    devTools: true
})