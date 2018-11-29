
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const { format, initialNotes, nonExistingId, notesInDb, usersInDb } 
= require('../utils/test_user_api')
// const Note = require('../models/note')
const User = require('../models/user')

describe('(a) testing login action', async () => {


  test('(1) typed wrong passowrd', async () => {

    const typedLogin = {
      "username": "henrik",
      "password": "wrong"
    }
  

    const response = await api
    .post('/api/login')
    .send(typedLogin)
    .expect(401)
    .expect('Content-Type', /application\/json/)

    console.log('response', response)
    expect(response.error.text).toEqual('{"error":"invalid username or password"}')

  })

  /*
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

      console.log('response.error', response.error)
      console.log('response.error.text', response.error.text)
 
      // expect(response.error).toBe("password is invalid (2)")
      // expect(response.error).toBe(Object {"Error": "cannot POST /api/users (400)"})
  //    const oo = {"error":"password is invalid (2)"}
      const oo = {error: 'password is invalid (2)'}
  //    expect(response.error).toBe('cannot POST /api/users (400)')
  //  Comparing two different types of values. Expected string but received object.

   // expect(response.error.text).toEqual(oo)

 expect(response.error.text).toEqual('{"error":"password is invalid (2)"}')
      /*   {
        "error": "password is invalid (2)"
      } */

      /*
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
      console.log('response.error', response.error)
      console.log('response.error.text', response.error.text)
  //     expect(response.error).toBe("password is invalid (1)")
 // expect(response.error).toBe(Object {"Error": "cannot POST /api/users (400)"})
 // expect(response.error.text).toEqual(oo)
 expect(response.error.text).toEqual('{"error":"password is invalid (1)"}')
 // expect(response.error.text).toBe(oo)
   /*   {
        "error": "password is invalid (2)"
      } */
      /*
  })
  */
})