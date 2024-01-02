import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    updateLoading: false,
    deleteLoading: false,
    logoutLoading: false,
    googleLoading: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.error = null
            state.loading = false
        },
        signInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        googleSignInStart: (state) => {
            state.googleLoading = true
        },
        googleSignInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.error = null
            state.googleLoading = false
        },
        googleSignInFailure: (state, action) => {
            state.error = action.payload
            state.googleLoading = false
        },
        signUpStart: (state) => {
            state.loading = true
        },
        signUpSuccess: (state, action) => {
            state.currentUser = action.payload
            state.error = null
            state.loading = false
        },
        signUpFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        updateUserStart: (state) => {
            state.updateLoading = true
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload
            state.error = null
            state.updateLoading = false
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload
            state.updateLoading = false
        },
        logoutStart: (state) => {
            state.logoutLoading = true
        },
        logoutSuccess: (state, action) => {
            state.currentUser = null
            state.error = null
            state.logoutLoading = false
        },
        logoutFailure: (state, action) => {
            state.error = action.payload
            state.logoutLoading = false
        },
        deleteUserStart: (state) => {
            state.deleteLoading = true
        },
        deleteUserSuccess: (state, action) => {
            state.currentUser = null
            state.error = null
            state.deleteLoading = false
        },
        deleteUserFailure: (state, action) => {
            state.error = action.payload
            state.deleteLoading = false
        }
    }
})


export const {
    signInFailure, 
    signInStart, 
    signInSuccess, 
    signUpStart, 
    googleSignInFailure,
    googleSignInStart,
    googleSignInSuccess,
    signUpSuccess, 
    signUpFailure, 
    updateUserStart, 
    updateUserFailure, 
    updateUserSuccess, 
    deleteUserFailure, 
    deleteUserStart,
    deleteUserSuccess, 
    logoutFailure, 
    logoutStart, 
    logoutSuccess
} = userSlice.actions
export default userSlice.reducer
