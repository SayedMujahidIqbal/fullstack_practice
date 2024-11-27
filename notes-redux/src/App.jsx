import { useEffect } from "react"
import { useDispatch } from "react-redux"
import NewNote from "./components/NewNote"
import Notes from "./components/Note"
import VisibilityFilter from "./components/VisibilityFilter"
import { initializeNotes } from "./reducers/noteReducer"
import { Container } from "@mui/material"
import Navbar from "./components/Navbar"

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeNotes())
  }, [])

  return (
    <Container>
      <Navbar />
      <h2>Notes</h2>
      <NewNote />
      <VisibilityFilter />
      <Notes />     
    </Container>
  )
}
export default App
