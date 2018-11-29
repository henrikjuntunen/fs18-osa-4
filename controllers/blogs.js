const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    
    
    
    /* promise  not asyn/await
    blog
    .save()
    .then(result => {
        response.status(201).json(result)
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'addition of blog failed' })
    })*/
    
    try {
        
        //const token = getTokenFrom(request)
        //const decodedToken = jwt.verify(token, process.env.SECRET)
        
       //console.log('blogs.js request.token', request.token)
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        
        // if (!token || !decodedToken.id) {
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        
        if (blog.title === undefined) {
            //      console.log('request.body', request.body)
            return response.status(400).json({error: 'title missing'})
        }
        if (blog.author === undefined) {
            //      console.log('request.body', request.body)
            return response.status(400).json({error: 'author missing'})
        }
        
        if (blog.url === undefined) {
            //      console.log('request.body', request.body)
            return response.status(400).json({error: 'url missing'})
        }
    
        if (blog.likes === undefined) {
            blog.likes = 0
        }
    
//        blog.user = "5bfeb54a7de9393a75f2336a"
//        blog.user = "5bfeb54a7de9393a75f2336b"
        
            const user = await User.findById(decodedToken.id)
            blog.user = user._id

        console.log('blog (1)', blog)
        console.log('user (1)', user)
        /*    const note = new Note({
              content: body.content,
              important: body.important === undefined ? false : body.important,
              date: new Date(),
              user: user._id
            }) */
        
            const savedBlog = await blog.save()
        
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
            console.log('blog (2)', blog)
            console.log('user (2)', user)
            
            response.json(Blog.format(blog))
          } catch(exception) {
            if (exception.name === 'JsonWebTokenError' ) {
              response.status(401).json({ error: exception.message })
            } else {
              console.log(exception)
              response.status(500).json({ error: 'something went wrong in blog.save() request ...' })
            }
        }


})
    /* promise
blogsRouter.get('/', (request, response) => {
        Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})*/

blogsRouter.get('/:id', async (request, response) => {
    try {
      const blog = await Blog.findById(request.params.id)
  
      if (blog) {
        response.json(formatBlog(blog))
        //response.json(blog)
      } else {
        response.status(404).end()
      }
  
    } catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'malformatted id' })
    }
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 } )
  
      // response.json(blogs)
      response.json(blogs.map(Blog.format))
})


    /*
    blogsRouter.post('/', (request, response) => {
        // const blog = new Blog(request.body)
        blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        
    })
    */
   
blogsRouter.put('/:id', (request, response) => {
       const body = request.body
       
       const blog = {
           title: body.title,
           author: body.author,
           url: body.url,
           likes: Number(body.likes)
        }
        
        Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })
})
    
blogsRouter.delete('/:id', (request, response) => {
     Blog
       .findByIdAndRemove(request.params.id)
       .then(result => {
         console.log(result)
         response.status(204).end()
       })
       .catch(error => {
         response.status(400).send({ error: 'malformatted id' })
         console.log('error', error)
       })
})
    
    
module.exports = blogsRouter