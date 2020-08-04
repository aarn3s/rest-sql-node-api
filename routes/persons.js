const express = require('express')
const router = express.Router()
const Pool = require('../pool')
const pool = Pool.getPool()



// Get All Persons
try {
  router.get('/', async (req, res) => {
    const results = await pool.query('select * from person')
    res.setHeader('content-type', 'application/json')
    res.send(JSON.stringify(results.rows))
  })
} catch(e) {
  console.log(e)
}

// Post a Person
router.post('/', async (req, res) => {
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
router.put('/', async (req, res) => {
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
router.delete('/', async (req, res) => {
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


module.exports = router