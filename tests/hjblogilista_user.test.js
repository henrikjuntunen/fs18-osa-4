
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { format, initialNotes, nonExistingId, notesInDb, usersInDb } 
= require('../utils/test_user_api')
// const Note = require('../models/note')
const User = require('../models/user')

describe('(a) when there is initially one user at db', async () => {
  
  beforeAll(async () => {
    console.log('(99) before all in users')
    // await User.remove({})
   // const user1 = new User({ username: 'root', name: 'root', password: 'secret' })
   // const user2 = new User({ username: 'henrik', name: 'Henrik Juntunen', password: 'salainen' })
   // const user3 = new User({ username: 'mluukkai', name: 'Matti Luukkainen', password: 'salattu' })
   // await user1.save()
   // await user2.save()
   // await user3.save()
  })

  test('(1.1) POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()


    const newUser1 = {
      username: 'root',
      name: 'Root Root',
      password: 'root'
    }

    await api
      .post('/api/users')
      .send(newUser1)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u=>u.username)
    expect(usernames).toContain(newUser1.username)

  })

  test('(1.2) POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser2 = {
      username: 'henrik',
      name: 'Henrik Juntunen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser2)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u=>u.username)
    expect(usernames).toContain(newUser2.username)

  })

  test('(1.3) POST /api/users succeeds with a fresh username', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser3 = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salattu'
    }

    await api
      .post('/api/users')
      .send(newUser3)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u=>u.username)
    expect(usernames).toContain(newUser3.username)
  })

  test('(2) GET /api/users fetch all users', async () => {
    const response = await api
    .get('/api/users')

    expect(response.body.length).toBe(3)
  })

  test('(3) usersInDb() all users are returned with find({})', async () => {
    const usersInDatabase = await usersInDb()
    expect(usersInDatabase.length).toBe(3)
  })

  test('(4) GET /api/users - users are returned as json', async () => {
    const result = await api
    .get('/api/users') 
    .expect(200)
    .expect('Content-Type', /application\/json/)
    //console.log('result', result)
  })

})

describe('(b) password', async () => {

  test('(1) POST /api/users passwordme', async () => {

    const newUser = {
      username: 'mluukkai1',
      name: 'Matti Luukkainen',
      password: 'sa'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
 //     console.log('response.error', response.error)
 //     console.log('response.error.text', response.error.text)
    expect(response.error.text).toEqual('{"error":"password is invalid (2)"}')
  })

  test('(2) POST /api/users passwordme', async () => {

    const newUser = {
      username: 'mluukkai1',
      name: 'Matti Luukkainen'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
   
      const o =   {
          "Error": "cannot POST /api/users (400)"
        }
        const oo = {error: "password is invalid (1)"}
//      console.log('response.error', response.error)
//      console.log('response.error.text', response.error.text)
      expect(response.error.text).toEqual('{"error":"password is invalid (1)"}')
  })

})

afterAll(() => {
  console.log('(99) after all in users')
    server.close()
})
