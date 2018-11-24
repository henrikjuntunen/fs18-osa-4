const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
// const Blog = require('./models/blog.js')
/*
const Blog2 = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})
*/

// module.exports = Blog

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.logger)
app.use('/api/blogs', blogsRouter)
app.use(middleware.error)

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
/*
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
*/
const PORT = process.env.PORT3003
/*
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
/*
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})
*/
server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}

/* Tehtävä 4 - 23.11.2018, 24.11.2018

4.1 blogilista, osa 1

Tee sovelluksesta toimiva npm-projekti. Jotta sovelluskehitys olisi sujuvaa, 
konfiguroi sovellus suoritettavaksi nodemon:illa. Voit luoda sovellukselle 
uuden tietokannan esim. mlabiin tai käyttää edellisen osan sovelluksen 
tietokantaa.

Varmista, että sovellukseen on mahdollista lisätä blogeja Postmanilla tai 
VS Code REST clientilla, ja että sovellus näyttää lisätyt blogit.

4.2 blogilista, osa 2
Jaa sovelluksen koodi osan 4 alun tapaan useaan moduuliin.

HUOM etene todella pienin askelin, varmistaen että kaikki toimii koko ajan. 
Jos yrität “oikaista” tekemällä monta asiaa kerralla, on Murphyn lain 
perusteella käytännössä varmaa, että jokin menee pahasti pieleen ja “oikotien” 
takia maaliin päästään paljon myöhemmin kuin systemaattisin pienin askelin.

Paras käytänne on commitoida koodi aina stabiilissa tilanteessa, tällöin on 
helppo palata aina toimivaan tilanteeseen jos koodi menee liian solmuun.

yksikkötestaus
Tehdään joukko blogilistan käsittelyyn tarkoitettuja apufunktioita. Tee 
funktiot esim. tiedostoon utils/list_helper.js. Tee testit sopivasti 
nimettyyn tiedostoon hakemistoon tests.

HUOM: jos jokin testi ei mene läpi, ei kannata ongelmaa korjatessa 
suorittaa kaikkia testejä, vaan ainoastaan rikkinäistä testiä hyödyntäen 
only-metodia.

*/