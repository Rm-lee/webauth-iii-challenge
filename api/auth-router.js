const router = require('express').Router();
const bcrypt = require("bcryptjs")
const restricted = require("../middleware/restricted")
const jwt = require('jsonwebtoken')
const Users = require('../user/user-model.js')
const secrets = require('../config/secrets.js');

router.post('/register', (req, res) => {
  Users.add(req.body)
  .then(ress => {
      console.log(ress)
      res.status(201).json(ress)
  })
  .catch(err => {
      res.status(500).json(err)
  })
  });

router.post("/login", async (req,res,next) => {
    try { 
        const {username,password}= req.body
        const user = await Users.findBy({username}).first()
    const passwordValid = await bcrypt.compare(password, user.password)
    if (user && passwordValid) {
        const token = generateToken(user)
        res.status(200).json({
            message: `welcome ${user.username}`,
            token
        
        })
    }
    else {
        res.status(401).json({
            message:"invalid"
        })
    }
}
catch (err){
    next(err)
}
})

router.get("/", restricted(), async (req, res, next) => {
    try {
      const users = await Users.find()
      
      res.json(users)
    } catch (err) {
      next(err)
    }
  })
  
function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username,
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
