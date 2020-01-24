const bcrypt = require("bcryptjs")
const db = require("../data/db-config")

module.exports = {
    add,
    findById,
    findBy,
    find
}
function find() {
  return db("user")
    .select("id", "username")
}
function findById(id){
   return db("user")
    .where({id})
    .first("id","username")
}
async function add(user){
    user.password = await bcrypt.hash(user.password,10)

     const [id] = await db("user")
    .insert(user)
 
  return findById(id)
    
}
function findBy(filter) {
    return db("user")
      .where(filter)
      .select("id", "username", "password")
  }