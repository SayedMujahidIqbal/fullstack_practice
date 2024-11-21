import { useDispatch, useSelector } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
        <span>{note.content}</span>
        <strong>{note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(({filter, notes}) => {
      if(filter === 'ALL'){
        return notes.notes
      }
      return filter === 'IMPORTANT'
      ? notes.notes.filter(note => note.important)
      : notes.notes.filter(note => !note.important)
    })
    return(
        <ul>
        {
          notes.map(note => 
           <Note
                key={note.id}
                note={note}
                handleClick={() => dispatch(toggleImportanceOf(note.id))} 
           />
          )
        }
      </ul>
    )
}

export default Notes
