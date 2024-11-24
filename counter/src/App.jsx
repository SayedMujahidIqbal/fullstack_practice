import { useEffect } from "react"
import { useDispatch } from "react-redux"
import NewNote from "./components/NewNote"
import Notes from "./components/Note"
import VisibilityFilter from "./components/VisibilityFilter"
import noteService from './services/notes'
import { initializeNotes } from "./reducers/noteReducer"

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeNotes())
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
