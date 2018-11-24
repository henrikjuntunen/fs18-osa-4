const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog.js')
/*const Blog2 = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})*/

module.exports = Blog

app.use(cors())
app.use(bodyParser.json())

// const mongoUrl = 'mongodb://localhost/bloglist'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)
.then( () => {
    console.log('connected to database', mongoUrl)
})
.catch( err => {
    console.log('err', err)
})

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = process.env.PORT3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

/* Tehtävä 4.1 - 23.11.2018
Tee sovelluksesta toimiva npm-projekti. Jotta sovelluskehitys olisi sujuvaa, 
konfiguroi sovellus suoritettavaksi nodemon:illa. Voit luoda sovellukselle 
uuden tietokannan esim. mlabiin tai käyttää edellisen osan sovelluksen 
tietokantaa.

Varmista, että sovellukseen on mahdollista lisätä blogeja Postmanilla tai 
VS Code REST clientilla, ja että sovellus näyttää lisätyt blogit.
*/