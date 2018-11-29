const logger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
  
const error = (request, response, next) => {
    response.status(404).send({ error: 'unknown blogs endpoint' })
    next()
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    } else {
        request.token = null
    }
 //   console.log('middleware request.token', authorization, request.token)
    next()
}
  
module.exports = {
    logger,
    error,
    tokenExtractor
}