import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import axios from 'axios'
import jwt from 'jwt-decode'
import Cookies from 'js-cookie';

const URL = 'http://localhost:3000'

const initialState = {
  person: [],
  status: 'idle', // differents value : 'iddle' | 'loading' |'succeeded' | 'failed'
  error: null
}

export const register = createAsyncThunk('persons/register', async (payload) => {

    const data = {
      user: {
        email: payload.name,
        password: payload.password
      }
    }
  
    const config = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };

    const response = await  fetch('http://localhost:3000/users', config)
  console.log(response)


  let token = await response.headers.get('authorization').split('').splice(6).join('')
  Cookies.set('auth-token', token)


    /*
    //token = await response.headers.get('authorization')
  const user = await response.json()
  console.log(user)
    return user
    */
  
})

const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state, action) => {
        //const token = action.data.token;
        //console.log(token)
        //const test = jwt(token)
        //console.log(test)
        console.log(state)
        
      state.persons.push(action.payload)
    })
    
  }
})



export default personsSlice.reducer