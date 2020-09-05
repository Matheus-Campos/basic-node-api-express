const express = require('express')
const cors = require('cors')

const routes = require('./routes')

const app = express()

/* Middlewares */
app.use(cors()) // allows requests from any origin
app.use(express.json()) // accepts json in requests

/* Routes */
app.use(routes)

app.listen(3333, () => console.log(`Listening on port 3333`))
