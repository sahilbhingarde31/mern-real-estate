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
        }
    },
});

export const {
    signinStart, 
    signinSuccess, 
    signinFailure,
    updateuserStart,
    updateuserSuccess,
    updateuserFailure,
} = userSlice.actions;

export default userSlice.reducer;