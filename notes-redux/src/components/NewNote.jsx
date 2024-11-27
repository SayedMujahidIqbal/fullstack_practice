import { useDispatch } from "react-redux"
import { createNote } from "../reducers/noteReducer"
import { Alert, Button, TextField } from "@mui/material"
import { useState } from "react"

const NewNote = () => {
  const [message, setMessage] = useState(null)
  const dispatch = useDispatch()
  const addNote = async (event) => {
      event.preventDefault()
      const content = event.target.note.value
      event.target.note.value = ''
      dispatch(createNote(content))
      setMessage(`new note '${content}' added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
  }

  return (
    <div>
      {(message && 
        <Alert severity="success">{message}</Alert>
      )}
      <form onSubmit={addNote}>
        <div>
          <TextField name="note" label="content" />
        </div>
        <Button variant="contained" color="primary" type="submit">add</Button>
      </form>
    </div>
  )
}

export default NewNote
