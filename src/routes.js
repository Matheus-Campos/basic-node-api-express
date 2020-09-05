const express = require('express')
const ResourceController = require('./controllers/ResourceController')

const routes = express.Router()

/* API health check */
routes.get('/', (request, response) => {
    response.send({ status: 'ok' })
})

routes.get('/resources', ResourceController.index)
routes.post('/resources', ResourceController.create)
routes.get('/resources/:id', ResourceController.show)
routes.put('/resources/:id', ResourceController.update)
routes.delete('/resources/:id', ResourceController.destroy)

module.exports = routes
