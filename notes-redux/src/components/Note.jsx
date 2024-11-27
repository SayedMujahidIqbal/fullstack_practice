import { useDispatch, useSelector } from "react-redux"
import { toggleImportanceOf } from "../reducers/noteReducer"
import { Link, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"

const Note = ({ note, handleClick }) => {
  return (
    <Link onClick={handleClick} style={{ textDecoration: 'none' }}>
        {note.content}
        {note.important ? 'important' : ''}
    </Link>
  )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(({filter, notes}) => {
      if(filter === 'ALL'){
        return notes
      }
      return filter === 'IMPORTANT'
      ? notes.filter(note => note.important)
      : notes.filter(note => !note.important)
    })
    return(
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
            {
              notes.map(note =>(
                <TableRow key={note.id} >
                    <TableCell>
                      <Note
                          note={note}
                          handleClick={() => dispatch(toggleImportanceOf(note.id))} 
                      />
                    </TableCell>
                    <TableCell>
                      {note.user}
                    </TableCell>
                </TableRow>
              ))
            }
            </TableBody>
          </Table>
        </TableContainer>
    )
}

export default Notes
