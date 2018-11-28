const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    console.log('body', body)

    if (body.username === undefined) {
        return response.status(400).json({error: 'username is missing'})
    }
    if (body.name === undefined) {
        return response.status(400).json({error: 'name is missing'})
    }
    if (body.adult === undefined) {
        body.adult = true
        // return response.status(400).json({error: 'adult info is missing'})
    }
    if (body.password === undefined) {
        return response.status(400).json({error: 'password is invalid (1)'})
    }
    if (body.password.length < 3) {
        return response.status(400).json({error: 'password is invalid (2)'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const usersBeforeOperation = await usersInDb()
    console.log('usersBeforeOperation', usersBeforeOperation)
    const usernames = usersBeforeOperation.map(u=>u.username===body.username)
    console.log('usernames', usernames)
    let loytyi = usernames.find(e => {e === true}) // TODO miten find toimii ?
    // loytyi = usernames.find(e => {console.log('e', e)}) // TODO miten find toimii ?
    console.log('loytyi1', loytyi)
    for (let i=0;i<usernames.length;i++){
        if (usernames[i]===true){
            loytyi=true
            break
        }
    }
    console.log('loytyi2', loytyi)
    // TODO tässä yllä olisi mahdollista käyttää reduce metodia
        if (loytyi === true){
            console.log('xxxc virhe')
            return response.status(400).json({error: 'invalid username given'})        
        } else {
            console.log('xxxc success')
            const user = new User({
                username: body.username,
                name: body.name,
                adult: body.adult,
                passwordHash
            })
            const savedUser = await user.save()
            response.json(savedUser)
        }
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: '... something went wrong with users ...' })
  }
})
/*
usersRouter.get('/', (request, response) => {
    User
    .find({})
    .then(users => {
        response.json(users)
    })
})*/

usersRouter.get('/:id', async (request, response) => {
    try {
      const user = await User.findById(request.params.id)
  
      if (user) {
        response.json(formatUser(user))
        // response.json(user)
      } else {
        response.status(404).end()
      }
  
    } catch (exception) {
      console.log(exception)
      response.status(400).send({ error: 'malformatted id' })
    }
})

usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({})
      .populate('blogs', {  title: 1,
                            author: 1,
                            url: 1,
                            likes:1 })  
  
    // response.json(users)
    response.json(users.map(User.format))
})

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

module.exports = usersRouter