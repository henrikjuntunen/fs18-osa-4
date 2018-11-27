const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
// const Note = require('../models/note')
const { // format, initialblogs, nonExistingId, 
    blogsInDb } = require('../utils/test_hjblogilista_api')

// 200 = OK
// 201 = Created

describe('pro fetch blogs from blogs-database', () => {
  test('all blogs are returned with find({})', () => {
    //   console.log('uri', process.env.MONGODB_URI)
       const blogsInDatabase = blogsInDb()
   //    expect(response.body.length).toBe(blogsInDatabase.length)
   //    console.log('blogsInDatabase', blogsInDatabase)
       expect(blogsInDatabase.length).toBe(3)
  })

  test('blogs are returned as json', () => {
    const result = api
    .get('/api/blogs') 
    .expect(200)
    .expect('Content-Type', /application\/json/)
    //console.log('result', result)
  })

})

describe.skip('pro insert new blogs to blogs-database', () => {

  test('POST /api/blogs succeeds with valid data', () => {
    
    /*
    const Blog = mongoose.model('Blog', {
      title: String,
      author: String,
      url: String,
      likes: Number
    })
    */
   /*
   {
     _id: "5a422bc61b54a676234d17fc",
     title: "Type wars",
     author: "Robert C. Martin",
     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
     likes: 2,
     __v: 0
    }  
    */
   const newBlog = {
     title: 'async/await yksinkertaistaa asynkronisten funktioiden kutsua',
     author: 'true',
     url: 'http://www.hs.fi',
     likes: 500006
    }
    
    const blogsAtStart = blogsInDb()
    .api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = blogsInDb()
    .expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
  })
  
  test('POST /api/blogs succeeds with valid data (2)', () => {
    const blogsAfterOperation = blogsInDb()

    const content = blogsAfterOperation.map(r => r.title)
    expect(content).toContain('async/await yksinkertaistaa asynkronisten funktioiden kutsua')
  })


})

afterAll(() => {
    server.close()
})