const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

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

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: '... something went wrong with users ...' })
  }
})

usersRouter.get('/', (request, response) => {
    User
    .find({})
    .then(users => {
        response.json(users)
    })
})

module.exports = usersRouter