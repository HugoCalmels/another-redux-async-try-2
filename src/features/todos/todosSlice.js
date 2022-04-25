import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import axios from 'axios'

// original tuto comes with : https://jsonplaceholder.typicode.com/

const TODOS_URL = 'http://localhost:3000/api/v1/todos'

const initialState = {
  todo: [],
  status: 'idle', // differents value : 'iddle' | 'loading' |'succeeded' | 'failed'
  error: null
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await axios.get(TODOS_URL)
    return [...response.data]
  } catch (err) {
    return err.message
  }
})

export const addNewTodo = createAsyncThunk('todos/addNewTodo', async (initialTodo) => {
  try {
    const response = await axios.post(TODOS_URL, initialTodo)
    return response.data
  } catch(err) {
    return err.message
  }
  
})

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action) {
        state.todos.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }

          }
        }
      }
    }, 
    reactionAdded(state, action) {
      const { todoId, reaction } = action.payload
      const existingTodo = state.todos.find(todo => todo.id === todoId)
      if (existingTodo) {
        existingTodo.reactions[reaction]++
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // not willing to do the other stuff other as title + content
      
        state.todos = action.payload
        console.log(state.todos)
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload)
      })
    
  }
})

export const selectAllTodos = (state) => state.todos.todos
export const getTodosStatus = (state) => state.todos.status
export const getTodosError = (state) => state.todos.error

export const { todoAdded, reactionAdded } = todosSlice.actions

export default todosSlice.reducer