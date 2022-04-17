import { createSlice, nanoid } from '@reduxjs/toolkit'
import {sub} from 'date-fns'


const initialState = [
  {
    id: '1',
    title: 'wahoo le titel',
    content: 'aazdazdazdazdazd azd azaz daz dazdazd azda zdaz daz daz',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  },
  {
    id: '2',
    title: 'wahoo lol',
    content: '45354354345354335 453453453543 543453453453543543453',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0
    }
  },
]

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action) {
        state.push(action.payload)
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
      const existingTodo = state.find(todo => todo.id === todoId)
      if (existingTodo) {
        existingTodo.reactions[reaction]++
      }
    }
  }
})

export const selectAllTodos = (state) => state.todos

export const { todoAdded, reactionAdded } = todosSlice.actions

export default todosSlice.reducer