import { useSelector } from 'react-redux';
import { selectAllTodos } from './todosSlice'
import TodoAuthor from './TodoAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButton'

const TodosList = () => {
  // choper les données dans le store
  const todos = useSelector(selectAllTodos)
  // const todos = useSelector(state => state.todos)

  const orderedTodos = todos.slice().sort((a, b) => b.date.localeCompare(a.date))

  // hmm ok le jsx ..
  const renderedTodos = orderedTodos.map(todo => (
    <article key={todo.id}>
      <h3>{todo.title}</h3>
      <p>{todo.content.substring(0, 100)}</p>
      <p>
        <TodoAuthor userId={todo.userId} />
        <TimeAgo timestamp={ todo.date}/>
      </p>
      <ReactionButtons todo={todo} />
    </article>
  ))

  return (
    <section>
      <h2>Todos</h2>
      {renderedTodos}
    </section>
  )
}


export default TodosList