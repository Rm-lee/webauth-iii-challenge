const bcrypt = require("bcryptjs")
const usersModel = require("../user/user-model")

module.exports = () => {
  const authErr = {
    message: "Invalid credentials",
  }

  return async (req, res, next) => {
    try {
        
      const { username, password } = req.headers
      if (!username || !password) {
        return res.status(401).json(authErr)
      }
      const user = await usersModel.findBy({ username }).first()
      if (!user) {
        return res.status(401).json(authErr)
      }

      const passwordValid = await bcrypt.compare(password, user.password)
      if (!passwordValid) {
        return res.status(401).json(authErr)
      }
      next()
    } catch (err) {
      next(err)
    }
  }
}