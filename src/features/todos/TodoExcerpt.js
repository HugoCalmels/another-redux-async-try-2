import TodoAuthor from './TodoAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButton'

const TodoExcerpt = ({ todo }) => {
  console.log(todo)
  return (
    <article>
      <h3>{todo.title}</h3>
      <p>{todo.content}</p>
      
    </article>
  )
}

/*
<p>
        <TodoAuthor userId={todo.userId} />
        <TimeAgo timestamp={ todo.date}/>
      </p>
      <ReactionButtons todo={todo} />
*/

export default TodoExcerpt