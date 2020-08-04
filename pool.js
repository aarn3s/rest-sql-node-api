const { Pool } = require('pg')

// Pool
const getPool = () => {
  return new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    max: 10,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000
  })
}

exports.getPool = getPool