const express = require('express')
const app = express()
const cors = require('cors')

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]


// const requestLogger = (request, response, next) => {
//   console.log("Method:", request.method)
//   console.log("Path:", request.path)
//   console.log("Body:", request.body)
//   console.log('---')
//   next()
// }

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
//app.use(requestLogger)

const generateId = () => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => Number(n.id)))
  : 0
  return String(maxId + 1)
}

app.post('/api/notes', (req, res) => {

  const body = req.body

  if(!body.content){
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const note = {
    content: body.concat,
    important: Boolean(body.important) || false,
    id: generateId(),
  }
  notes = notes.concat(note)
  res.json(note)
})

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})  

app.get('/api/notes', (req, res) => {
      res.send(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const note = notes.find(note => note.id === id)
    if(note){
        res.json(note)
    }else{
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

// app.put('/api/notes/:id', (req, res) => {
//   const id = req.params.id
//   const noteTobeUpdated = notes.find(note => note.id === id)
//   noteTobeUpdated.content = req.content
//   noteTobeUpdated.important = req.important
//   console.log("Updated Note is : ", noteTobeUpdated)
// })

const unKnownEndPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unKnownEndPoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})