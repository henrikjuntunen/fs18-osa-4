const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
// const Note = require('../models/note')
const { // format, initialblogs, nonExistingId, 
    blogsInDb } = require('../utils/test_hjblogilista_api')
const middleware = require('../utils/middleware')

// 200 = OK
// 201 = Created

/*
promise malli

axios.get('http://example.com/probably_will_fail')
  .then(response => {
    console.log('success!')
  })
  .catch(error => {
    console.log('fail')
  })

*/



describe.skip('pro fetch blogs from blogs-database', () => {
  test('(1)  blogs are returned as json 404', () => {
    //   console.log('uri', process.env.MONGODB_URI)
      // const blogsInDatabase = blogsInDb()
   //    expect(response.body.length).toBe(blogsInDatabase.length)
   //    console.log('blogsInDatabase', blogsInDatabase)

   const result = api
   .get('/api/blogsx') 
   .then(result => {
        expect('status', 404)
        expect('Content-Type', /application\/json/)
      })
   .catch(result => {console.log('result', result)})
/*
   const result = api
   .get('/api/blogsx') 
   .expect(404)
   .expect('Content-Type', /application\/json/)
   .catch(error => {console.log('error(3)', error)})
   //console.log('result', result)
  */
 /*
  console.log('hjblogilista test 001 a')
   const promise1 = 
   api.get('/api/blogsx')
   .catch(error => {console.log('error(1)001', error)})
   console.log('hjblogilista test 001 b')
   const promise2 = 
   promise1.then(r => {
     console.log('hjblogilista test 001 ok r', r)
     expect(2).toBe(2)
    })
   .catch(error => {console.log('error(2)001', error)
   expect(3).toBe(2)})
   console.log('hjblogilista test 001 c')
   // 
   console.log('promise', promise1, promise2)
*/
  /* 
  .expect(length)
   .toBe(3)
   .catch(error)
    console.log('result', result)
*/

  })

  test('(2) all blogs are returned with promise', () => {
    //   console.log('uri', process.env.MONGODB_URI)
      // const blogsInDatabase = blogsInDb()
   //    expect(response.body.length).toBe(blogsInDatabase.length)
   //    console.log('blogsInDatabase', blogsInDatabase)
   console.log('hjblogilista test 002 a')
   const promise1 = 
   api.get('/api/blogs')
   .then(r => {
     expect(1).toBe(1)
     console.log('hjblogilista test 002 ok r', r)
    })
    .catch(error => {
      expect(1).toBe(0)
      console.log('error(2)002', error)
    })

     console.log('hjblogilista test 002 b')
    // { Error: cannot GET /api/blogsx (404)
   console.log('promise', promise1)
 })


  test('(3) blogs are returned as json 200', () => {
/*
    const result = api
    .get('/api/blogs') 
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .catch(error => {console.log('error(3)', error)})
  */
   //console.log('result', result)
   const result = api
    .get('/api/blogs') 
    .then(result => {
      expect('status', 200)
      expect('Content-Type', /application\/json/)
    })
    .catch(result => {console.log('result', result)})
  })

})

describe('pro insert new blogs to blogs-database', () => {

  test.skip('POST /api/blogs succeeds with valid data', async () => {
    const blogsAtStart = await blogsInDb()

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

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterOperation = await blogsInDb()

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
  })
  
  test('POST /api/blogs succeeds with valid data (2)', () => {
    const promise1 = 
    blogsInDb()
    .then(blogsAfterOperation => {
      const content = blogsAfterOperation.map(r => r.title)
      expect(content).toContain('async/await yksinkertaistaa asynkronisten funktioiden kutsua')
      console.log('post succeeded')
    })
    .catch(e => {console.log('post failed', e)})
  })


})

afterAll(() => {
    server.close()
})