const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

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
app.use('/api/users', usersRouter)
app.use(middleware.error)

// const mongoUrl = 'mongodb://localhost/bloglist'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl)
.then( () => {
    console.log('connected to database')
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

4.3 apufunktioita ja yksikkötestejä, osa 1
Määrittele ensin funktio dummy joka saa parametrikseen taulukollisen 
blogeja ja palauttaa aina luvun 1. Tiedoston list_helper.js sisällöksi 
siis tulee tässä vaiheessa

4.4 apufunktioita ja yksikkötestejä, osa 2
Määrittele funktio totalLikes joka saa parametrikseen taulukollisen blogeja. 
Funktio palauttaa blogien yhteenlaskettujen tykkäysten eli likejen määrän.

Määrittele funktiolle sopivat testit. Funktion testit kannattaa laittaa 
describe-lohkoon jolloin testien tulostus ryhmittyy miellyttävästi.

4.5* apufunktioita ja yksikkötestejä, osa 3

Määrittele funktio favoriteBlog joka saa parametrikseen taulukollisen blogeja. 
Funktio selvittää millä blogilla on eniten likejä. Jos suosikkeja on monta, 
riittää että funktio palauttaa niistä jonkun.

4.6* apufunktioita ja yksikkötestejä, osa 4
Tämä ja seuraava tehtävä ovat jo hieman haastavampia. Tehtävien tekeminen 
ei ole osan jatkon kannalta oleellista, eli voi olla hyvä idea palata näihin 
vasta kun muu osa on kahlattu läpi.

4.7* apufunktioita ja yksikkötestejä, osa 5
Määrittele funktio mostLikes joka saa parametrikseen taulukollisen blogeja. 
Funktio selvittää kirjoittajan, kenen blogeilla on eniten likejä. Funktion 
paluuarvo kertoo myös suosikkiblogaajan likejen yhteenlasketun määrän.

4.8 blogilistan testit, osa 1
Tee API-tason testit blogilistan osoitteeseen /api/blogs tapahtuvalle 
HTTP GET -pyynnölle.
Kun testi on valmis, refaktoroi operaatio käyttämään promisejen sijaan 
async/awaitia.

The Promise object represents the eventual completion (or failure) of an 
asynchronous operation, and its resulting value.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

4.9 blogilistan testit, osa 2
Tee testit blogin lisäämiselle, eli osoitteeseen /api/blogs tapahtuvalle 
HTTP POST -pyynnölle.
Kun testi on valmis, refaktoroi operaatio käyttämään promisejen sijaan 
async/awaitia.

4.10* blogilistan testit, osa 3
Tee testi joka varmistaa, että jos kentälle likes ei anneta arvoa, 
asetetaan sen arvoksi 0. Muiden kenttien sisällöstä ei tässä tehtävässä 
vielä välitetä. Laajenna ohjelmaa siten, että testi menee läpi.

4.11* blogilistan testit, osa 4
Tee testit blogin lisäämiselle, eli osoitteeseen /api/blogs tapahtuvalle 
HTTP POST -pyynnölle, joka varmistaa, että jos uusi blogi ei sisällä kenttiä title ja url, pyyntöön vastataan statuskoodilla 400 Bad request
Laajenna toteutusta siten, että testit menevät läpi.

4.12* blogilistan laajennus, osa 1
Refaktoroi projektin testit siten, että ne eivät enää ole riippuvaisia siitä, 
että HTTP GET -operaatioiden testit suoritetaan ennen uusien blogien lisäämisen 
testaamista. Määrittele myös sopivia apumetodeja, joiden avulla saat poistettua 
testeistä copypastea.

4.13 blogilistan laajennus, osa 2
Toteuta sovellukseen mahdollisuus yksittäisen blogin poistoon.
Käytä async/awaitia. Noudata operaation HTTP-rajapinnan suhteen 
RESTful-käytänteitä.
Saat toteuttaa ominaisuudelle testit jos haluat. Jos et, varmista 
ominaisuuden toimivuus esim. Postmanilla.

4.14* blogilistan laajennus, osa 3
Toteuta sovellukseen mahdollisuus yksittäisen blogin muokkaamiseen.
Käytä async/awaitia.
Tarvitsemme muokkausta lähinnä likejen lukumäärän päivittämiseen. 
Toiminnallisuuden voi toteuttaa samaan tapaan kuin muistiinpanon 
päivittäminen toteutettiin osassa 3.
Saat toteuttaa ominaisuudelle testit jos haluat. Jos et, varmista 
ominaisuuden toimivuus esim. Postmanilla.


*/