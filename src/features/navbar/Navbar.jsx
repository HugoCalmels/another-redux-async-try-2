import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from "../persons/personsSlice"

const Navbar = () => {
  const dispatch = useDispatch();
  const form = document.getElementById('form')

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const canSave = [name, password].every(Boolean) && addRequestStatus === 'idle';

  const onSaveTodoClicked = () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        dispatch(register({ name, password })).unwrap()
        setName('')
        setPassword('')
      } catch (err) {
        console.error('Failed to save the person', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }


  const listenTheForm = (e) => {
    e.preventDefault()
    console.log('hi?')
    console.log(name)
    console.log(password)
    form.reset()
  }
  



  return (
    <div className="navbar">
      <form>
      <input type='text' placeholder="name" onChange={(e) => setName(e.target.value)}></input>
      <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
      <button type="button" onClick={onSaveTodoClicked} >send</button>
        </form>
    </div>
  )

}

export default Navbar