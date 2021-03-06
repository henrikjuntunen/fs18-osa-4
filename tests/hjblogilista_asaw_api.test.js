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
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    "likes": 0
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
  /*
  await Blog.remove({})
  
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  addedBlog = new Blog(initialBlogs[2])
  await addedBlog.save()
  */
})

// TODO save ja post ovat eri asia
// CRUD
describe.skip('(.)X experimental testing', () => {
  console.log('X experimental testing')

  test('(1) POST /api/blogs X experimental testing', async () => {
    const blogsAtStart = await blogsInDb()

    const newBlog = {
      title: 'async/await x-1',
      author: 'true',
      url: 'http://www.hs.fi',
      likes: 5
    }

    /*
    req:
             _header: 'POST /api/blogs HTTP/1.1\r\nHost: 
             127.0.0.1:61730\r\nAccept-Encoding: gzip, deflate\r\nUser-Agent: 
             node-superagent/3.8.3\r\nAuthorization: 
             Basic W29iamVjdCBPYmplY3RdOg==\r\n
             Content-Type: 
             application/json\r\nContent-Length: 78\r\nConnection: close\r\n\r\n',
         _onPendingData: [Function: noopPendingOutput],

                  _header: 'POST /api/blogs HTTP/1.1\r\nHost: 
                  127.0.0.1:51242\r\nAccept-Encoding: gzip, 
                  deflate\r\nUser-Agent: node-superagent/3.8.3\r\n
                  content-type: 
                  multipart/form-data; boundary=--------------------------
                  786110969798443356212673\r\nContent-Length: 183\r\nConnection: 
                  close\r\n\r\n',
         _onPendingData: [Function: noopPendingOutput],
    */
    const result = await api
      .post('/api/blogs')
      //.set('Content-Type', 'text')
      //.set("Authorization", "barer xxxxxxx1x")
      //.auth("Authorization", "barer xxxxxxx2x")
      //.auth("bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW")
      //.auth()
      //.field("_header", "postia")
      //.field("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW")
      //.field("Puppu", "Puppua")
      .send(newBlog)
  //    .expect(201)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    console.log('result', result)

    const blogsAfterOperation = await blogsInDb()

    console.log('blogsAfterOperation', blogsAfterOperation)

    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
  
    })
})

describe.skip('(b)C insert new blogs to blogs-database', () => {
  console.log('C insert new blogs to blogs-database')

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
   // console.log('res', res)
   // console.log('res.body', res.body)
    const blogsAfterOperation = await blogsInDb()
   // console.log('blogsAfterOperation', blogsAfterOperation)
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
   // console.log('res', res)
   // console.log('res.body', res.body)
    const blogsAfterOperation = await blogsInDb()
   // console.log('blogsAfterOperation', blogsAfterOperation)
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
  //  console.log('res', res)
  //  console.log('res.body', res.body)
    const blogsAfterOperation = await blogsInDb()
  //  console.log('blogsAfterOperation', blogsAfterOperation)
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
   // console.log('res', res)
   // console.log('res.body', res.body)
    const blogsAfterOperation = await blogsInDb()
   // console.log('blogsAfterOperation', blogsAfterOperation)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 0)
 //   expect(res.body.likes).toBe(0)
  })


})

describe('(a)R fetch blogs from blogs-database', () => {
  console.log('R fetch blogs from blogs-database')

  test('(1) all blogs are returned with find({})', async () => {
    const blogsInDatabase = await blogsInDb()
    expect(blogsInDatabase.length).toBe(6)
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

      expect(response.body.length).toBe(6)
  })

})

describe.skip('(d)U update blogs in blogs-database', () => {
console.log('U update blogs in blogs-database')

  test('(1) PUT /api/notes/:id {} succeeds with proper statuscode', async () => {
    // PUT
  const updateBlog = {
    "title": "Type wars yellow",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    "likes": 44
  }
 // console.log('updateBlog', updateBlog)
  const blogsBeforeOperation = await blogsInDb()
 // console.log('blogsBeforeOperation', blogsBeforeOperation)
  /* await api
  .put('/api/blogs/5bfe57f1e00aad343558650f')
  .send(updateBlog)
  .expect(200) */
  await api
  .put(`/api/blogs/${blogsBeforeOperation[2]._id}`)
  .send(updateBlog)
  .expect(200)
  
  const blogsAfterOperation = await blogsInDb()
 // console.log('blogsAfterOperation', blogsAfterOperation)
  const titles = blogsAfterOperation.map(r => r.title)

  expect(titles).toContain(updateBlog.title)
  expect(blogsAfterOperation.length).toBe(blogsAfterOperation.length)
  })
})


describe.skip('(c)D delete blogs to blogs-database', () => {
  console.log('D delete blogs to blogs-database')

  let addedBlog
  

  test('(1) DELETE /api/notes/:id succeeds with proper statuscode', async () => {
    const blogsAtStart = await blogsInDb()
  //  console.log('addedBlog', addedBlog)
    await api
    .delete(`/api/blogs/${addedBlog._id}`)
    .expect(204)

    const blogsAfterOperation = await blogsInDb()

    const titles = blogsAfterOperation.map(r => r.title)

    expect(titles).not.toContain(addedBlog.title)
    expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
  })
})


//api.post
afterAll(() => {
  console.log('(99) after all in hjblogilista')
    server.close()
})
/*
PASS  tests/hjblogilista_asaw_api.test.js (14.883s)
(a) fetch blogs from blogs-database
  ✓ (1) all blogs are returned with find({}) (65ms)
  ✓ (2) blogs are returned as json (139ms)
  ✓ (3) all two blogs are returned (62ms)
(b) insert new blogs to blogs-database
  ✓ (1) POST /api/blogs succeeds with valid data (243ms)
  ✓ (2) POST /api/blogs succeeds with valid data (2) (57ms)
  ✓ (3) POST /api/blogs likes defaults to 0 if missing (204ms)
  ✓ (4) POST /api/blogs missing fields (tittle) (128ms)
  ✓ (5) POST /api/blogs missing fields (author) (139ms)
  ✓ (6) POST /api/blogs missing fields (url) (131ms)
(c) insert new blogs to blogs-database
  ✓ (1) DELETE /api/notes/:id succeeds with proper statuscode (181ms)
(d) update blogs to blogs-database
  ✓ (1) PUT /api/notes/:id {} succeeds with proper statuscode (178ms)
  */
/* */ 