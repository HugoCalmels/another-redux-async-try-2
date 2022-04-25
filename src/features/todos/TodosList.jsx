import { useSelector, useDispatch } from 'react-redux';
import { selectAllTodos, getTodosStatus, getTodosError, fetchTodos } from './todosSlice'

import {useEffect} from 'react'
import TodoExcerpt  from './TodoExcerpt';
const TodosList = () => {
  const dispatch = useDispatch();

  
  // choper les données dans le store
  const todos = useSelector(selectAllTodos)
  console.log(todos)
  const todosStatus = useSelector(getTodosStatus)
  const error = useSelector(getTodosError)
  // const todos = useSelector(state => state.todos)

  useEffect(() => {
    if (todosStatus === 'idle') {
      dispatch(fetchTodos())
    }
  }, [todosStatus, dispatch])

  /*
  const orderedTodos = todos.slice().sort((a, b) => b.date.localeCompare(a.date))
  // hmm ok le jsx ..
  const renderedTodos = orderedTodos.map(todo => (
    <TodoExcerpt />
  ))
  */
  
  let content;
  if (todosStatus === 'loading') {
    content = <p>"Loading... "</p>
  } else if (todosStatus === 'succeeded') {
    content = todos.map(todo => <TodoExcerpt key={todo.id} todo={todo}/>)
  } else if (todosStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section>
      <h2>Todos</h2>
      {content}
    </section>
  )
}


export default TodosList