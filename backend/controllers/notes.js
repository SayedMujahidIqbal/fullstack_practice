const notesRouter = require('express').Router()
const Note = require('../models/note')


notesRouter.get('/', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

notesRouter.get('/:id', (req, res, next) => {
  Note.findById(req.params.id).then(note => {
    if(note){
      res.json(note)
    } else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

notesRouter.post('/', (req, res, next) => {

  const body = req.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  note.save().then(savedNote => {
    res.json(savedNote)
  })
    .catch(error => next(error))
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

notesRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(request.params.id, { content, important }, { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter