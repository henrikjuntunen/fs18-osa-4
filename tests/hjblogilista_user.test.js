
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { format, initialNotes, nonExistingId, notesInDb, usersInDb } 
= require('../utils/test_user_api')
// const Note = require('../models/note')
const User = require('../models/user')

describe('(a) when there is initially one user at db', async () => {
  beforeAll(async () => {
    await User.remove({})
    const user = new User({ username: 'root', password: 'secret' })
    await user.save()
  })

  test('(1) POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u=>u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('(2) GET /api/users fetch all users', async () => {
    const response = await api
    .get('/api/users')

    expect(response.body.length).toBe(2)
  })

  test('(3) usersInDb() all users are returned with find({})', async () => {
    const usersInDatabase = await usersInDb()
    expect(usersInDatabase.length).toBe(2)
  })

  test('(4) GET /api/users - users are returned as json', async () => {
    const result = await api
    .get('/api/users') 
    .expect(200)
    .expect('Content-Type', /application\/json/)
    //console.log('result', result)
  })


})