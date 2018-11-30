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

// CRUD

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

       // console.log('blog (1)', blog)
       // console.log('user (1)', user)
        /*    const note = new Note({
              content: body.content,
              important: body.important === undefined ? false : body.important,
              date: new Date(),
              user: user._id
            }) */
        
            const savedBlog = await blog.save()
        
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
        //    console.log('blog (2)', blog)
        //    console.log('user (2)', user)
            
            response.json(Blog.format(blog))
          } catch(exception) {
            if (exception.name === 'JsonWebTokenError' ) {
              response.status(401).json({ error: exception.message })
            } else {
              console.log(exception)
              response.status(500).json({ error: 'something went wrong in blog create' })
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
    
blogsRouter.delete('/:id', async (request, response) => {
    
    // Tarkastetaan token
    // Haetaan tokenin avulla user
    // Haetaan poistettava requestin idn mukainen blog
    // Verrataan onko blogin user sama kuin toikenilla löydetty user id
    // Jos user (token-id ja blog-user) on sama niin tehdään poistamistoimenpide
    // Jos user (token-id ja blog-user) on eri niin tehdään authorization fail toimenpide
    // return resonse toiminnolla tullaa ulos deletestä
    
    let decodedToken = null

    try {
        decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
    } catch(exception) {
        if (exception.name === 'JsonWebTokenError' ) {
            return response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            return response.status(500).json({ error: 'something (1) went wrong in blog delete' })
        }
    }

    if (decodedToken !== null) {
        const user = await User.findById(decodedToken.id)
        console.log('user', user)
        try {
            const blog = await Blog.findById(request.params.id)
            console.log('blog', blog)
            try {
                if (user._id.toString() === blog.user.toString()) {
                    try {
                        const result = await Blog.findByIdAndRemove(request.params.id)
                        console.log(result)
                        response.status(204).end()
                    }
                    catch(error) {
                        console.log('error', error)
                        response.status(400).send({ error: 'something (4) went wrong in blog delete' })
                    }
                } else {
                    response.status(403)
                    .json({ error: 'not you blog error or something (3) went wrong in blog delete' })
                }
            }
            catch(error) {
                console.log(error)
                response.status(404).send({ error: 'blog not found or something (2) went wrong in blog delete' })
            }
        }
        catch(error) {
            console.log(error)
            response.status(400).send({ error: 'invalid id or something (5) went wrong in blog delete' })
        }
}
        
})
   
// HTTP/1.1 400 Bad Request
// HTTP/1.1 500 Internal Server Error
// www.w3.org http error codes list

module.exports = blogsRouter