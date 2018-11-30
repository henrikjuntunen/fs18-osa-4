const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
// const Note = require('../models/note')
const { // format, initialblogs, nonExistingId, 
    blogsInDb } = require('../utils/test_hjblogilista_api')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

// 200 = OK
// 201 = Created
// 400 = missing

beforeAll(async () => {
  console.log('(0) before all tests of hjblogilista blogs,users')
  
  await Blog.remove({})
  await User.remove({})
  
})

describe('(a) fetch blogs from blogs-database', () => {

  test('(1) all blogs are returned with find({})', async () => {
    const blogsInDatabase = await blogsInDb()
    expect(blogsInDatabase.length).toBe(0)
  })
})


describe('(b) fetch users from blogs-database', () => {

  test('(1) all users are returned with find({})', async () => {
    const blogsInDatabase = await blogsInDb()
    expect(blogsInDatabase.length).toBe(0)
  })
})

afterAll(() => {
  console.log('(99) after all in hjblogilista blogs,users')
    server.close()
})
