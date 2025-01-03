import { useEffect, useState, useRef } from "react"
import Note from "./components/Note"
import noteService from './services/notes'
import Notification from "./components/Notification"
import loginService from "./services/login"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import NoteForm from "./components/NoteForm"

////////////// Component Helper Functions ///////////
// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

// // const Display = ({ counter }) => {
// //   return(
// //     <div>{counter}</div>
// //   )
// // }

// ////////////// Conditional Rendering ///////////////
// const History = (props) => {
//   if(props.allClicks.length === 0){
//     return(
//       <div>
//         The app is used by pressing the buttons
//       </div>
//     )
//   }
//   return(
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const App = () => {
//   // const name = 'Mujahid'
//   // const age = 20
//   // const [counter, setCounter] = useState(0)

//   // setTimeout(
//   //   () => setCounter(counter + 1),
//   //   1000
//   // )

//   // const handleClick = () => {
//   //   console.log("clicked")
//   // }
//   // const [counter, setCounter] = useState(0)
//   // console.log("rendering with counter value", counter)
//   // const increaseByOne = () => {
//   //   console.log("increasing, value before", counter)
//   //   setCounter(counter + 1)
//   // }
//   // const setToZero = () => {
//   //   console.log("resetting to zero, value before", counter)
//   //   setCounter(0)
//   // }
//   // const decreaseByOne = () => {
//   //   console.log("descreasing, value before", counter)
//   //   setCounter(counter - 1)
//   // }

//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])
//   const [total, setTotal] = useState(0)

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     const updatedLeft = left + 1
//     setLeft(updatedLeft)
//     setTotal(updatedLeft + right)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     const updatedRight = right + 1
//     setRight(updatedRight)
//     setTotal(left + updatedRight)
//   }

//   // const [clicks, setClicks] = useState({
//   //   left: 0, right: 0
//   // })

//   // const handleLeftClick = () => {
    
//   //   setClicks({...clicks, left: clicks.left + 1})
//   // }

//   // const handleRightClick = () => {
//   //   setClicks({...clicks, right: clicks.right + 1})
//   // }

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text="left" />
//       <Button onClick={handleRightClick} text="right" />
//       {/* <button onClick={() => setLeft(left + 1)}>left</button>
//       <button onClick={() => setRight(right + 1)}>right</button> */}
//       {right}
//       <History allClicks={allClicks} />
//       {/* <p>total {total}</p> */}
//         {/* <Display counter={counter} />
//         <Button 
//           onClick={increaseByOne}
//           text="plus" 
//         />
//         <Button 
//           onClick={setToZero}
//           text="zero" 
//         />
//         <Button 
//           onClick={decreaseByOne}
//           text="minus" 
//         /> */}
//         {/* <h1>Greetings</h1>
//         <Hello name="Asad" age={26+3} />
//         <Hello name={name} age={age} /> */}
//     </div>
//   )
// }

// const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>
// const Display = (props) => <p>{props.value}</p>

// const App = () => {
//   const [value, setValue] = useState(10)

//   // const handleClick = () => {
//   //   setValue(0)
//   // }

//   ///////////////// Function that returns a function
//   // const hello = (who) => {
//   //    console.log("hello", who)
//   // }

//   const setToValue = (newValue) => {
//     console.log("Value now", newValue)
//     setValue(newValue)
//   }


//   return(
//     <div>
//       <Display value={value} />
//       <Button handleClick={() => setToValue(1000)} text="thousand" />
//       <Button handleClick={() => setToValue(0)} text="reset" />
//       <Button handleClick={() => setToValue(value + 1)} text="increment" />
//     </div>
//   )
// }

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return(
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}


const App = () => { 
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const noteFormRef = useRef()

  useEffect(() => {
    noteService.getAll()
    .then(initalNotes => {
        setNotes(initalNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id === id ? returnedNote : note))
    })
    .catch(error => {
      setErrorMessage(
        `Note ${note.content} was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return(
      <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
      </Togglable>
    )
  }

  const noteForm = () => {
    return(
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    )
  }

  return(
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? 
        loginForm() : 
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      }
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />)}
      </ul>
      <Footer />
    </div>
  )
}

export default App
