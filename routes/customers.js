const express = require('express')
const router = express.Router()
const Pool = require('../pool')
const pool = Pool.getPool()



// Get All Customers
try {
  router.get('/', async (req, res) => {
    const results = await pool.query('select * from customer')
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(results.rows))
  })
} catch(e) {
  console.log(e)
}

// Post a Customer
router.post('/', async (req, res) => {
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
router.put('/', async (req, res) => {
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
router.delete('/', async (req, res) => {
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


module.exports = router