import { useState } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
// import { nanoid } from "@reduxjs/toolkit"
import { addNewTodo } from "./todosSlice"
import {selectAllUsers} from '../users/usersSlice'


const AddTodoForm = () => {
  const dispatch = useDispatch()

  // temporary state 
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const users = useSelector(selectAllUsers)

  // one line function ..
  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  // if canSave is true ..
  // const canSave = Boolean(title) && Boolean(content) && Boolean(userId)
  const canSave = [title, content].every(Boolean) && addRequestStatus === 'idle';

  // global states
  /*
  const onSaveTodoClicked = () => {
    if (title && content) {
      dispatch(
        todoAdded(title, content, userId)
      )
      setTitle('')
      setContent('')
    }
  }
  */
  const onSaveTodoClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        dispatch(addNewTodo({ title, content })).unwrap()
        setTitle('')
        setContent('')
      } catch (err) {
        console.error('Failed to save the post', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const userOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a new Todo</h2>
      <form>
        <label htmlFor="todoTitle">Todo Title:</label>
        <input
          type="text"
          name="todoTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="todoContent">Content:</label>
        <textarea 
          name="todoContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSaveTodoClicked} disabled={!canSave}>send</button>
      </form>
    </section>
  )
}

export default AddTodoForm