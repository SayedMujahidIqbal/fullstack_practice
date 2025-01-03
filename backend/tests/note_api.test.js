const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const Note = require('../models/note')
const api = supertest(app)

describe('when there is initially some note saved', () => {
  beforeEach(async() => {
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)
  })

  test('notes are returned as json', async() => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async() => {
    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note within the returned notes', async() => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(r => r.content)
    assert(contents.includes('Browser can execute only JavaScript'))
  })

  describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
      Note.schema.set('toJSON', {
        transform: (document, returendObject) => {
          returendObject.id = returendObject._id.toString()
          delete returendObject._id
          delete returendObject.__v
        }
      })

      const notesAtStart = await helper.notesInDb()

      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('a valid note can be added', async() => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
      }
      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('async/await simplifies making async calls'))

      const deleteNewAddedNote = notesAtEnd[notesAtEnd.length - 1]

      await api
        .delete(`/api/notes/${deleteNewAddedNote.id}`)
        .expect(204)

    })

    test('fails with status code 400 if data is invalid', async () => {
      const newNote = {
        important: true
      }
      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)
      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  describe('deletion of ', () => {
    test('succeeds with status 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToBeDeleted = notesAtStart[0]
      await api
        .delete(`/api/notes/${noteToBeDeleted.id}`)
        .expect(204)
      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
      const contents = notesAtEnd.map(r => r.content)
      assert(!contents.includes(noteToBeDeleted.content))
    })
  })
})



after(async () => {
  await mongoose.connection.close()
})