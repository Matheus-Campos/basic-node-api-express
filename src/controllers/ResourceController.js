const { createDBConnection } = require('../services/database')

module.exports = {
    async index(request, response) {
        try {
            const conn = await createDBConnection()
            const result = await conn.query('SELECT * FROM resources')
            conn.end()

            const resources = result[0]
            response.send({ resources })
        } catch (err) {
            response.sendStatus(500)
        }
    },

    async create(request, response) {
        try {
            const conn = await createDBConnection()
            let result = await conn.query('INSERT INTO resources VALUES (?, ?)', [null, request.body.name])
            const resourceId = result[0].insertId
            result = await conn.query('SELECT * FROM resources WHERE id = ?', [resourceId])
            conn.end()

            const resources = result[0]
            response.status(201).send(resources[0])
        } catch (err) {
            response.sendStatus(500)
        }
    },

    async show(request, response) {
        try {
            const resourceId = request.params.id
            const conn = await createDBConnection()
            const result = await conn.query('SELECT * FROM resources WHERE id = ?', [resourceId])
            conn.end()

            const resources = result[0]
            response.send(resources[0])
        } catch (err) {
            response.sendStatus(500)
        }
    },

    async update(request, response) {
        try {
            const resourceId = request.params.id
            const newName = request.body.name
            const conn = await createDBConnection()
            let result = await conn.query('UPDATE resources SET name = ? WHERE id = ?', [newName, resourceId])
            result = await conn.query('SELECT * FROM resources WHERE id = ?', [resourceId])
            conn.end()
            
            const resources = result[0]
            response.send(resources[0])
        } catch (err) {
            response.sendStatus(500)
        }
    },

    async destroy(request, response) {
        try {
            const resourceId = request.params.id
            const conn = await createDBConnection()
            const result = await conn.query('SELECT * FROM resources WHERE id = ?', [resourceId])
            await conn.query('DELETE FROM resources WHERE id = ?', [resourceId])
            conn.end()
            
            const resources = result[0]
            response.send(resources[0])
        } catch (err) {
            response.sendStatus(500)
        }
    }
}
