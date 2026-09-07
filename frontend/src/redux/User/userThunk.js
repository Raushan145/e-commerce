import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { ServerURL } from "../../App.jsx";


export const signupThunk = createAsyncThunk(
    "user/signup",
    async ({ name, email, password }, { rejectWithValue }) => {

        try {
            
        const response = await axios.post(`${ServerURL}/api/v1/user/signup`, { name, email, password }, { withCredentials: true });

            console.log(response?.data)
        return response.data;

        } catch (error) {
              return rejectWithValue( error.response?.data?.message || "Signup failed" );

        }
    }
)

export const signinThunk = createAsyncThunk(
    "user/signin",
    async ({ email, password }, { rejectWithValue }) => {

        try {
            
        const response = await axios.post(`${ServerURL}/api/v1/user/signin`, { email, password }, { withCredentials: true });

       
        return response.data;

        } catch (error) {
              return rejectWithValue( error.response?.data?.message || "SignIn failed" );

        }
    }
)

export const signoutThunk = createAsyncThunk(
    "user/signout",
    async (_, {rejectWithValue}) =>{

        try {
              console.log("fulfilled thunk Hit")
        const response = await axios.post(`${ServerURL}/api/v1/user/signout`, {}, { withCredentials: true });

       console.log(response)
        return response.data.user || response.data;

        } catch (error) {
              return rejectWithValue( error.response?.data?.message || "Signout failed" );

        }
    }
)

export const getCurrentUserThunk = createAsyncThunk(
    "user/getCurrentUser",
    async (_, {rejectWithValue}) =>{

        try {
            
        const response = await axios.get( `${ServerURL}/api/v1/user/current-user`, { withCredentials: true, } );

        return response.data;

        } catch (error) {
            // console.log(error.response.data)
            // console.log(error.response)
            return rejectWithValue( error.response?.data?.message || "User not authenticated" );

        }
    }
)