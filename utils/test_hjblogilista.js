// const Note = require('../models/note')
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
  return blogs.map(Blog)
}
/*
const usersInDb = async () => {
  const users = await User.find({})
  return users
}
*/
module.exports = {
  // initialNotes, nonExistingId, 
  blogsInDb 
  // usersInDb
}