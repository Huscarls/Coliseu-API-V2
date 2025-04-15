const userServ = require("../services/user.service.js")
const authServ = require("../services/auth.service.js")
const sessionServ = require("../services/session.service.js")


async function login(req, res) {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: "Missing information" })
    const foundUser = await userServ.findUser(username)
    if (!foundUser) return res.status(401).json({ message: "Username or password incorrect" })
      const correctPassword = authServ.verifyPassword(password, foundUser.password_hash)
    if (!correctPassword) return res.status(401).json({ message: "Username or password incorrect" })
    const sessionId = await sessionServ.createSession(foundUser.id)
    return res.status(200).json({ message: "Login successful", sessionId, userId: foundUser.id })
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

async function logout(req, res) {
  try {
    const { sessionId } = req.body
    if (!sessionId) return res.status(400).json({ message: "Missing information" })
    await sessionServ.closeSession(sessionId)
    return res.status(200).json({ message: "Logout successful" })
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

async function findActiveSession(req, res) {
  try {
    const sessionId = await req.headers["session-id"]
    const userId = await req.headers["user-id"]
    if (!sessionId || !userId) return false
    const foundSession = await sessionServ.findActiveSession(sessionId, userId)
    if (!foundSession) return false
    return true
  } catch (err) {
    return res.status(500).json(err.message)
  }
}

module.exports = {
  login,
  logout,
  findActiveSession
}