const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', (request, response) => {
    Blog
    .find({})
    .then(blogs => {
        response.json(blogs)
    })
})
  
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
module.exports = blogsRouter