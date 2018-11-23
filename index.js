const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = Blog

app.use(cors())
app.use(bodyParser.json())

// const mongoUrl = 'mongodb://localhost/bloglist'
const mongoUrl = 'mongodb://risto:pass2wRisto@ds033754.mlab.com:33754/hjblogilista'
mongoose.connect(mongoUrl)

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

const PORT = 3003
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