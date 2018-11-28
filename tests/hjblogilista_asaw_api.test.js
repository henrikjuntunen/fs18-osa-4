const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
// const Note = require('../models/note')
const { // format, initialblogs, nonExistingId, 
    blogsInDb } = require('../utils/test_hjblogilista_api')
const Blog = require('../models/blog.js')

// 200 = OK
// 201 = Created
// 400 = missing


const initialBlogs = [
  {
    "title": "metsäkeskus",
    "author": "Suomen metsäkeskus",
    "url": "https://www.metsakeskus.fi/blogi",
    "likes": 7
  },
  {
    "title": "Suomen luonnonsuojeluliitto",
    "author": "Suomen luonnonsuojeluliiton keskustoimisto",
    "url": "https://www.sll.fi/arkisto/ajankohtaista",
    "likes": 12
  },
  {
    "title": "Type wars black",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  },
  {
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  },
  {
    "title": "Type wars",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
  },
  {
    "title": "Type wars",
    "author": "Robert C. Martin"
  },
  {
    "title": "Type wars",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    "likes": 77
  }  
]

beforeAll(async () => {
  console.log('(0) before all tests of hjblogilista')

  await Blog.remove({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

describe('(a) fetch blogs from blogs-database', () => {

  test('(1) all blogs are returned with find({})', async () => {
    const blogsInDatabase = await blogsInDb()
    expect(blogsInDatabase.length).toBe(2)
  })

  test('(2) blogs are returned as json', async () => {
    const result = await api
    .get('/api/blogs') 
    .expect(200)
    .expect('Content-Type', /application\/json/)
    //console.log('result', result)
  })

  test('(3) all two blogs are returned', async () => {
      const response = await api
      .get('/api/blogs')

      expect(response.body.length).toBe(2)
  })

})

describe('(b) insert new blogs to blogs-database', () => {

  test('(1) POST /api/blogs succeeds with valid data', async () => {
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
  
  test('(2) POST /api/blogs succeeds with valid data (2)', async () => {
    const blogsAfterOperation = await blogsInDb()

    const content = blogsAfterOperation.map(r => r.title)
    expect(content).toContain('async/await yksinkertaistaa asynkronisten funktioiden kutsua')
  })

  test('(3) POST /api/blogs likes defaults to 0 if missing', async () => {
    const blogsAtStart = await blogsInDb()
    const newBlog = {
      title: 'async/awaitXX yksinkertaistaa asynkronisten funktioiden kutsua',
      author: 'true',
      url: 'http://www.lapinkansa.fi'
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    console.log('res', res)
    console.log('res.body', res.body)
    const blogsAfterOperation = await blogsInDb()
    console.log('blogsAfterOperation', blogsAfterOperation)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
    expect(res.body.likes).toBe(0)

  })

  test('(4) POST /api/blogs missing fields (tittle)', async () => {
    const blogsAtStart = await blogsInDb()
    const newBlog = {
    //  title: 'async/awaitXX yksinkertaistaa asynkronisten funktioiden kutsua',
      author: 'true',
      url: 'http://www.lapinkansa.fi',
      likes: 9
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    console.log('res', res)
    console.log('res.body', res.body)
    const blogsAfterOperation = await blogsInDb()
    console.log('blogsAfterOperation', blogsAfterOperation)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 0)
 //   expect(res.body.likes).toBe(0)
  })

  test('(5) POST /api/blogs missing fields (author)', async () => {
    const blogsAtStart = await blogsInDb()
    const newBlog = {
      title: 'async/awaitXX yksinkertaistaa asynkronisten funktioiden kutsua',
    //  author: 'true',
      url: 'http://www.lapinkansa.fi',
      likes: 9
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    console.log('res', res)
    console.log('res.body', res.body)
    const blogsAfterOperation = await blogsInDb()
    console.log('blogsAfterOperation', blogsAfterOperation)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 0)
 //   expect(res.body.likes).toBe(0)
  })

  test('(6) POST /api/blogs missing fields (url)', async () => {
    const blogsAtStart = await blogsInDb()
    const newBlog = {
      title: 'async/awaitXX yksinkertaistaa asynkronisten funktioiden kutsua',
      author: 'true',
    //  url: 'http://www.lapinkansa.fi',
      likes: 9
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    console.log('res', res)
    console.log('res.body', res.body)
    const blogsAfterOperation = await blogsInDb()
    console.log('blogsAfterOperation', blogsAfterOperation)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 0)
 //   expect(res.body.likes).toBe(0)
  })


})

describe('(c) insert new blogs to blogs-database', () => {

  let addedBlog
  
  beforeAll(async () => {
    addedBlog = new Blog(initialBlogs[2])
    await addedBlog.save()
  })

  test('(1) DELETE /api/notes/:id succeeds with proper statuscode', async () => {
    const blogsAtStart = await blogsInDb()
    console.log('addedBlog', addedBlog)
    await api
    .delete(`/api/blogs/${addedBlog._id}`)
    .expect(204)

    const blogsAfterOperation = await blogsInDb()

    const titles = blogsAfterOperation.map(r => r.title)

    expect(titles).not.toContain(addedBlog.title)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
  })
})

describe('(d) update blogs to blogs-database', () => {

  test('(1) PUT /api/notes/:id {} succeeds with proper statuscode', async () => {
    // PUT
  const updateBlog = {
    "title": "Type wars yellow",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    "likes": 44
  }
  console.log('updateBlog', updateBlog)
  const blogsBeforeOperation = await blogsInDb()
  consile.log('blogsBeforeOperation', blogsBeforeOperation)
  await api
  .put(`/api/blogs/${addedBlog._id}, ${updateBlog}`)
  .expect(200)

  const blogsAfterOperation = await blogsInDb()
  consile.log('blogsAfterOperation', blogsAfterOperation)
  const titles = blogsAfterOperation.map(r => r.title)

  expect(titles).toContain(updateBlog.title)
  expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
})

afterAll(() => {
  console.log('(99) after all in hjblogilista')
    server.close()
})
/* */ 