import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    currentUser: null,
    error:null,
    loading:false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signinStart: (state) =>{
            state.loading = true;
        },
        signinSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signinFailure: (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        },
        updateuserStart: (state) =>{
            state.loading = true;
        },
        updateuserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateuserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteuserStart: (state) => {
            state.loading = true;
        },
        deleteuserSuccess: (state) =>{
            state.currentUser = null;
            state.loading =false;
            state.error = null;
        },
        deleteuserFailure: (state,action) =>{
            state.error = action.payload;
            state.loading  = false;
        },
        signoutStart: (state) =>{
            state.loading = true;
        },
        signoutSuccess: (state) =>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signoutFailure: (state, action) =>{
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    signinStart, 
    signinSuccess, 
    signinFailure,
    updateuserStart,
    updateuserSuccess,
    updateuserFailure,
    deleteuserStart,
    deleteuserSuccess,
    deleteuserFailure,
    signoutStart,
    signoutSuccess,
    signoutFailure,
} = userSlice.actions;

export default userSlice.reducer;