import { 
  Routes, 
  Route, 
  Link, 
  Navigate,
  useMatch
} from "react-router-dom"
import Home from "./compnents/Home"
import Users from "./compnents/Users"
import Notes from "./compnents/Notes"
import { useState } from "react"
import Note from "./compnents/Note"
import Login from "./compnents/Login"

function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)

  const login = (user) => {
    setUser(user)
  }
  
  const padding = {
    padding: 5
  }

  const match = useMatch('/notes/:id')
  const note = match
                ? notes.find(note => note.id === Number(match.params.id))
                : null

  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {
          user 
          ? <em>{user} logged-in</em>
          : <Link style={padding} to="/login">login</Link>

        }
      </div>
      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <div>
        <em style={{color: 'green'}}>Note app, Department of Computer Science 2024</em>
      </div>
    </div>
  )
}

export default App
