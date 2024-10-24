const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

console.log('password', password)

const url =
  `mongodb+srv://fullstack:${password}@cluster0.g9sia.mongodb.net/testNotesdb`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Node added for testing purpose',
  important: false
})

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })


note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})