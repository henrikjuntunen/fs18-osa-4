const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
// const Note = require('../models/note')
const { // format, initialblogs, nonExistingId, 
    blogsInDb } = require('../utils/test_hjblogilista_api')

// 200 = OK
// 201 = Created

describe('pro fetch blogs from blogs-database', () => {
  // 4.8 Tee API-tason testit blogilistan 
  // osoitteeseen /api/blogs tapahtuvalle HTTP GET -pyynnölle.
  test('all blogs are returned with find({})', () => {
    const blogsInDatabase = blogsInDb()
    expect(blogsInDatabase.length).toBe(2)
  })

  test('blogs are returned as json', () => {
    const result = api
    .get('/api/blogs') 
    .expect(200)
    .expect('Content-Type', /application\/json/)
    //console.log('result', result)
  })

  test('all two blogs are returned', () => {
      const response = api
      .get('/api/blogs')
      .expect(body.length).toBe(2)
  //    .expect(response.body.length).toBe(2)
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

    /*
describe.only('fetch blogs from blogs-database', async () => {

    test('environmetvariables are for test', async () => {
        let result = 'test'
        result = process.env.NODE_ENV
        expect(result).toBe('test')
    })

    test('reading environmetvariables file really happens locally', async () => {
      let result = process.env.ENVFILE
      expect(result).toBe('envfile')
    })

    test('all blogs are returned as json by GET /api/blogs', async () => {
        console.log('uri', process.env.MONGODB_URI)
        const blogsInDatabase = await blogsInDb()
        const response = await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    
        expect(response.body.length).toBe(blogsInDatabase.length)
    
        const returnedContents = response.body.map(n => n.content)
        blogsInDatabase.forEach(note => {
          expect(returnedContents).toContain(note.content)
        })
      })
})
*/
    /*
describe('when there is initially some blogs saved', async () => {
  beforeAll(async () => {
    await Note.remove({})

    const noteObjects = initialblogs.map(n => new Note(n))
    await Promise.all(noteObjects.map(n => n.save()))
  })

  test('all blogs are returned as json by GET /api/blogs', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedContents = response.body.map(n => n.content)
    blogsInDatabase.forEach(note => {
      expect(returnedContents).toContain(note.content)
    })
  })

  test('individual blogs are returned as json by GET /api/blogs/:id', async () => {
    const blogsInDatabase = await blogsInDb()
    const aNote = blogsInDatabase[0]

    const response = await api
      .get(`/api/blogs/${aNote.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.content).toBe(aNote.content)
  })

  test('404 returned by GET /api/blogs/:id with nonexisting valid id', async () => {
    const validNonexistingId = await nonExistingId()

    const response = await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('400 is returned by GET /api/blogs/:id with invalid id', async () => {
    const invalidId = "5a3d5da59070081a82a3445"

    const response = await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  describe('addition of a new note', async () => {

    test('POST /api/blogs succeeds with valid data', async () => {
      const blogsAtStart = await blogsInDb()

      const newNote = {
        content: 'async/await yksinkertaistaa asynkronisten funktioiden kutsua',
        important: true
      }

      await api
        .post('/api/blogs')
        .send(newNote)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAfterOperation = await blogsInDb()

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)

      const contents = blogsAfterOperation.map(r => r.content)
      expect(contents).toContain('async/await yksinkertaistaa asynkronisten funktioiden kutsua')
    })

    test('POST /api/blogs fails with proper statuscode if content is missing', async () => {
      const newNote = {
        important: true
      }

      const blogsAtStart = await blogsInDb()

      await api
        .post('/api/blogs')
        .send(newNote)
        .expect(400)

      const blogsAfterOperation = await blogsInDb()

      const contents = blogsAfterOperation.map(r => r.content)

      expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })
  })

  describe('deletion of a note', async () => {
    let addedNote

    beforeAll(async () => {
      addedNote = new Note({
        content: 'poisto pyynnöllä HTTP DELETE',
        important: false
      })
      await addedNote.save()
    })

    test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
      const blogsAtStart = await blogsInDb()

      await api
        .delete(`/api/blogs/${addedNote._id}`)
        .expect(204)

      const blogsAfterOperation = await blogsInDb()

      const contents = blogsAfterOperation.map(r => r.content)

      expect(contents).not.toContain(addedNote.content)
      expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
    })
  })

  
})

*/
afterAll(() => {
    server.close()
})