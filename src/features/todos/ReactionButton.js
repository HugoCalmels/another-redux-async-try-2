import { useDispatch } from 'react-redux'
import { reactionAdded } from './todosSlice'

const reactionEmoji = {
  thumbsUp: ':D',
  wow: ':)',
  heart: ':--)',
  rocket: ":P",
  coffee: ":o"
}

const ReactionButtons = ({todo}) => {

  const dispatch = useDispatch()
  
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    console.log(name)
    console.log(emoji)
    return (
      <button
      key={name}
      type="button"
      className="reactionButton"
      onClick={() => {
        dispatch(reactionAdded({ todoId: todo.id, reaction: name}))
      }}
    >
      {emoji} {todo.reactions[name]}

    </button>
    )
  })
    
  return <div>{reactionButtons}</div>
}

export default ReactionButtons