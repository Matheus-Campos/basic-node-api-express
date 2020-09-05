const mysql = require('mysql2/promise')

async function createDBConnection() {
    const connection = await mysql.createConnection({
        database: 'basic_node_api',
        host: 'db4free.net',
        port: 3306,
        user: 'basic_node_admin',
        password: 'admin123'
    })

    return connection
}

module.exports = { createDBConnection }
