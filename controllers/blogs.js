const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    
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

    blog.user = "5bfeb54a7de9393a75f2336a"
    blog.user = "5bfeb54a7de9393a75f2336b"
        /*
    if (blog.likes === undefined) {
        const blogx = new Blog ({ title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: 0 })
            blogx
            .save()
            .then(result => {
                response.status(201).json(result)
            })
            console.log('blogx', blogx)
            //      console.log('request.body', request.body)
            //     return response.status(400).json({error: 'likes missing'})
        } else {
            blog
            .save()
            .then(result => {
                response.status(201).json(result)
            })
        }
        */

       blog
       .save()
       .then(result => {
           response.status(201).json(result)
       })
       .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'addition of blog failed' })
        })
    })
    /*
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