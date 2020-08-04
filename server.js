// const { Pool } = require('pg')
const express = require('express')
const app = express();
require('dotenv/config')

// Import Routes
const customersRoute = require('./routes/customers')
const personsRoute = require('./routes/persons')

// Middlewares
app.use(express.json())
app.use('/customers', customersRoute)
app.use('/persons', personsRoute)

/*
// Pool
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  max: 10,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 10000
})
*/

// Listen
app.listen(process.env.APP_PORT, () => {
  console.log('Server up and running on PORT:', process.env.APP_PORT)
})

/*
// Get All Customers
try {
  app.get('/customers', async (req, res) => {
    const results = await pool.query('select * from customer')
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(results.rows))
  })
} catch(e) {
  console.log(e)
}

// Post a Customer
app.post('/customers', async (req, res) => {
  let result = {}
  try {
    const reqJson = req.body
    result.success = await createCustomer(reqJson)
  }
  catch(e) {
    result.success=false
  }
  finally {
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(result))
  } 
})

// Put a Customer
app.put('/customers', async (req, res) => {
  let result = {}
  try {
    const reqJson = req.body
    result.success = await updateCustomer(reqJson)
  }
  catch(e) {
    result.success=false
  }
  finally {
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(result))
  } 
})

// Delete a Customer and it's relations
app.delete('/customers', async (req, res) => {
  let result = {}
  try {
    const reqJson = req.body
    console.log(reqJson)
    result.customerSuccess = await deleteCustomer(reqJson.id)
    result.relatedSuccess = await deleteRelatedPersons(reqJson.id)
  }
  catch(e) {
    console.log(e, ' from delete customers')
    result.success=false
  }
  finally {
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(result))
  }
})




// Get All Persons
try {
  app.get('/persons', async (req, res) => {
    const results = await pool.query('select * from person')
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(results.rows))
  })
} catch(e) {
  console.log(e)
}

// Post a Person
app.post('/persons', async (req, res) => {
  let result = {}
  try {
    const reqJson = req.body
    result.success = await createPerson(reqJson)
  }
  catch(e) {
    result.success=false
  }
  finally {
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(result))
  } 
})

// Put a Person
app.put('/persons', async (req, res) => {
  let result = {}
  try {
    const reqJson = req.body
    result.success = await updatePerson(reqJson)
  }
  catch(e) {
    result.success=false
  }
  finally {
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(result))
  } 
})

// Delete a Person
app.delete('/persons', async (req, res) => {
  let result = {}
  try {
    const reqJson = req.body
    result.success = await deletePerson(reqJson.id)
  }
  catch(e) {
    result.success=false
  }
  finally {
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(result))
  }
})




//Functions
async function createCustomer(customer){
  try {
    await pool.query(
      'insert into customer (name, is_active) values ($1, $2)',
      [customer.name, customer.is_active]
    )
    return true
  } catch(e) {
    console.log(e)
    return false
  }
}

async function updateCustomer(customer){
  try {
    await pool.query(
      'update customer set name=$2, is_active=$3 where id=$1',
      [customer.id, customer.name, customer.is_active]
    )
    return true
  } catch(e) {
    console.log(e)
    return false
  }
}

async function deleteCustomer(id){
  try {
    await pool.query('delete from customer where id = $1', [id])
    return true
  } catch(e) {
    console.log(e)
    return false
  }
}

// Functions
// instead of wrapping rewrite if function to be: if (isCustomer =!) return false
async function createPerson(person){
  if (await isCustomer(person.customer_id)) {
    try {
      await pool.query(
        'insert into person (first_name, last_name, role, is_deleted, customer_id) values ($1, $2, $3, $4, $5)',
        [person.first_name, person.last_name, person.role, person.is_deleted, person.customer_id]
      )
      return true
    } catch(e) {
      console.log(e)
      return false
    }
  } return false
}

// instead of wrapping rewrite if function to be: if (isCustomer =!) return false
async function updatePerson(person){
  if (await isCustomer(person.customer_id)) {
    try {
      await pool.query(
        'update person set first_name=$2, last_name=$3, role=$4, is_deleted=$5, customer_id=$6 where id=$1',
        [person.id, person.first_name, person.last_name, person.role, person.is_deleted, person.customer_id]
      )
      return true
    } catch(e) {
      console.log(e)
      return false
    }
  } return false
}

async function deletePerson(id){
  try {
    await pool.query('delete from person where id = $1', [id])
    return true
  } catch(e) {
    return false
  }
}

async function isCustomer(id){
  try {
    const result = await pool.query('select exists (select 1 from customer where id = $1)', [id])
    return(result.rows[0].exists)
  } catch(e) {
    console.log(e)
    return false
  }
}

async function deleteRelatedPersons(customer_id) {
  try {
    console.log(customer_id, ' from deleteRelated')
    await pool.query('delete from person where customer_id = $1', [customer_id])
    return true
  } catch(e) {
    console.log(e)
    return false
  }
}
*/