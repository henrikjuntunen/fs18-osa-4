const listHelper = require('../utils/list_helper')

describe('blogs counting', () => {
    test('dummy is called', () => {
        const blogs = []
        
        const result = listHelper.dummy(blogs)
        expect(1).toBe(1)
    })
})

describe('total likes in one blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
})
describe('total likes in blogs', () => {

    const blogsEmpty = []
    
    test('when list has empty blog equals the likes of that', () => {
        expect(listHelper.totalLikes(blogsEmpty)).toBe(0)
    })

  const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

  // TDD
  test('when list has many blogs equals the likes of that (1)', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('when list has many blogs equals the likes of that (2)', () => {
    const result = listHelper.totalLikes(blogs)
    const total = 7 + 5 + 12 + 10 + 0 + 2
    expect(result).toBe(total)
  })

})

describe.only('favorite blog', () => {

    const blogs = [
        {
          _id: "5a422a851b54a676234d17f7",
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 77,
          __v: 0
        },
        {
          _id: "5a422aa71b54a676234d17f8",
          title: "Go To Statement Considered Harmful",
          author: "Edsger W. Dijkstra",
          url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
          likes: 5,
          __v: 0
        },
        {
          _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
        },
        {
            _id: "5a422b3a2b54a676234d17f9",
            title: "Canonical string reduction 2",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 1,
            __v: 0
          },
          {
            _id: "5a422b3a3b54a676234d17f9",
            title: "Canonical string reduction 3",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          },
        {
          _id: "5a422b891b54a676234d17fa",
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
          likes: 10,
          __v: 0
        },
        {
          _id: "5a422ba71b54a676234d17fb",
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0,
          __v: 0
        },
        {
          _id: "5a422bc61b54a676234d17fc",
          title: "Type wars",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
          likes: 2,
          __v: 0
        }  
      ]

      test('if the favorite blog is [0]', () => {
        let result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[0])
      })

      test('if the toEqual is correct comparation here', () => {
        expect(blogs[2]).toEqual(blogs[2])
      })

      test('if the favorite author is ["Edsger W. Dijkstra"] according blogs count', () => {
        let result = listHelper.mostBlogs(blogs)
        expect(result.author).toEqual('Edsger W. Dijkstra')
        expect(result.authorBlogCount).toEqual(4)
      })

      test('if the toEqual is correct comparation here', () => {
        expect('Edsger W. Dijkstra').toEqual('Edsger W. Dijkstra')
      })

      test('if the toEqual is correct comparation here', () => {
        expect('Edsger W. Dijkstra').toEqual("Edsger W. Dijkstra")
      })

      test('if the favorite author is ["Michael Chan"] according likes', () => {
        let result = listHelper.mostLikes(blogs)
        expect(result.author).toEqual('Michael Chan')
        expect(result.likes).toEqual(77)
      })


})
// npm run test /tests/list_helper.test.js
// blogilistabackend@0.0.1 test: `cross-env NODE_ENV=test node_modules/.bin/jest --verbose "/tests/list_helper.test.js"`
