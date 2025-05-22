const userServ = require("../services/user.service.js")
const authServ = require("../services/auth.service.js")
const sessionServ = require("../services/session.service.js")


async function login(req, res) {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({})
    const foundUser = await userServ.findUserByUsername(username)
    if(!foundUser) return res.status(401).json({})

    const correctPassword = authServ.verifyPassword(password, foundUser.password_hash)
    if (!correctPassword) return res.status(401).json({})
    delete foundUser.password_hash
    const token = sessionServ.getToken(foundUser.id)
    await sessionServ.registerToken(foundUser.id, token)
    req.newToken = token
    const resObj = {data: foundUser}
    if(req.newToken) resObj.token = req.newToken
    
    return res.status(200).json({ token, data: foundUser})
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)
  }
}

async function logout(req, res) {
  try {
    const { token } = req.body
    if (!token ) return res.status(400).json()
    await sessionServ.logout(token)
    return res.status(200).json()
  } catch (err) {
    console.log(err)
    return res.status(500).json(err.message)

  }
}

module.exports = {
  login,
  logout
}