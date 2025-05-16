const userServ = require("../services/user.service.js")
const sessionServ = require("../services/session.service.js")
const cripServ = require("../services/criptography.service.js")

async function createUser(req, res) {
  try {
    const { full_name, username, password, id_clan, profile } = req.body
    if (!full_name || !username || !password || !id_clan || !profile) return res.status(400).send()
    if (!String(full_name).trim() || !String(username).trim() || !String(password).trim()) return res.status(400).send()
    const passwordHash = cripServ.hashPassword(password)
    await userServ.createUser(full_name.trim(), username.trim(), passwordHash, id_clan, profile)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(201).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

async function getUsers(req, res) {
  try {

    const users = await userServ.getUsers()
    
    const resObj = {data: users}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)

  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

async function getUser(req, res) {
  try {
    const { id } = req.params
    if(!id) return res.status(400).send()
    const user = await userServ.findUserById(id)
    if(!user) return res.status(404).send()

    const resObj = {data: user}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)

  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

async function enableUserById(req, res) {
  try {
    const { id } = req.body
    if(!id) return res.status(400).send()
    await userServ.enableUserById(id)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

async function disableUserById(req, res) {
  try {
    const { id } = req.body
    if(!id) return res.status(400).send()
    await userServ.disableUserById(id)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params
    if(!id) return res.status(400).send()
    const { full_name, username, profile } = req.body
    if(!full_name || !username || !profile) return res.status(400).send()

    await userServ.updateUser(id, full_name, username, profile)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)

  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

async function changePasswordOverride(req,res) {
  try {
    const { id } = req.params
    if(!id) return res.status(400).send()
    const { password } = req.body
    if(!password || password.length < 8) return res.status(400).send()

    const passwordHash = cripServ.hashPassword(password)
    await userServ.changePasswordOverride(id, passwordHash)

    await sessionServ.logoffAllSessions(id)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params
    if(!id) return res.status(400).send()
    await userServ.deleteUserById(id)

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
}

module.exports = {
  createUser,
  getUsers,
  enableUserById,
  disableUserById,
  deleteUser,
  updateUser,
  getUser,
  changePasswordOverride
}