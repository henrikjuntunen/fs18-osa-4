// const Note = require('../models/note')
const Blog = require('../index')
// const User = require('../models/user')

/*
const initialBlogilista = [{
  "_id": "5bf7eb61239c481237258fe3",
  "title": "metsäkeskus",
  "author": "Suomen metsäkeskus",
  "url": "https://www.metsakeskus.fi/blogi",
  "likes": 27,
  "__v": 0
}, {
  "_id": "5bf7ed7e239c481237258fe4",
  "title": "Suomen luonnonsuojeluliitto",
  "author": "Suomen luonnonsuojeluliiton keskustoimisto",
  "url": "https://www.sll.fi/arkisto/ajankohtaista",
  "likes": 212,
  "__v": 0
}]
*/
/*
const nonExistingId = async () => {
  const note = new Note()
  await note.save()
  await note.remove()

  return note._id.toString()
}
*/
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  console.log('blogs', blogs)
  console.log('Blog', blogs.map(Blog))
  return blogs.map(Blog)
}
/*
const usersInDb = async () => {
  const users = await User.find({})
  return userss
}
*/
module.exports = {
  // initialNotes, nonExistingId, 
  blogsInDb 
  // usersInDb
}

/*
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 344
ETag: W/"158-zkMI684kgxS/VsL98YSLoF3TNPo"
Date: Sat, 24 Nov 2018 18:00:44 GMT
Connection: keep-alive

[{
  "_id": "5bf7eb61239c481237258fe3",
  "title": "metsäkeskus",
  "author": "Suomen metsäkeskus",
  "url": "https://www.metsakeskus.fi/blogi",
  "likes": 7,
  "__v": 0
}, {
  "_id": "5bf7ed7e239c481237258fe4",
  "title": "Suomen luonnonsuojeluliitto",
  "author": "Suomen luonnonsuojeluliiton keskustoimisto",
  "url": "https://www.sll.fi/arkisto/ajankohtaista",
  "likes": 12,
  "__v": 0
}]
*/