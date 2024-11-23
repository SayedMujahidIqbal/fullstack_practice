import { useEffect } from "react"
import { useDispatch } from "react-redux"
import NewNote from "./components/NewNote"
import Notes from "./components/Note"
import VisibilityFilter from "./components/VisibilityFilter"
import noteService from './services/notes'
import { setNotes } from "./reducers/noteReducer"

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    noteService.getAll().then(notes => dispatch(setNotes(notes)))
  }, [])

  return (
    <div>
      <h2>Notes</h2>
      <NewNote />
      <VisibilityFilter />
      <Notes />     
    </div>
  )
}
export default App
