const userServ = require("../services/user.service.js")
const authServ = require("../services/auth.service.js")
const sessionServ = require("../services/session.service.js")


async function login(req, res) {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: "Missing information" })
    const foundUser = await userServ.findUser(username)
    if(!foundUser) return res.status(404).send()

    const correctPassword = authServ.verifyPassword(password, foundUser.password_hash)
    if (!correctPassword) return res.status(401).send()
    delete foundUser.password_hash
    const token = sessionServ.getToken(foundUser.id)
    await sessionServ.registerToken(foundUser.id, token)
    
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
    return res.status(500).json(err.message)
  }
}

module.exports = {
  login,
  logout
}