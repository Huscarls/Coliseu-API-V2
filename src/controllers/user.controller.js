const userServ = require("../services/user.service.js")
const sessionServ = require("../services/session.service.js")
const cripServ = require("../services/criptography.service.js")

async function createUser(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    const { full_name, username, password, id_clan, profile } = req.body
    if (!full_name || !username || !password || !id_clan || !profile) return res.status(400).json({})
    if (!String(full_name).trim() || !String(username).trim() || !String(password).trim()) return res.status(400).json(resObj)
    const passwordHash = cripServ.hashPassword(password)
    await userServ.createUser(full_name.trim(), username.trim(), passwordHash, id_clan, profile)

    return res.status(201).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json({})
  }
}

async function getUsers(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    resObj.data = users
    const users = await userServ.getUsers()
    
    return res.status(200).json(resObj)

  } catch (err) {
    console.log(err)
    return res.status(500).json({})
  }
}

async function getUser(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    const { id } = req.params
    if(!id) return res.status(400).json(resObj)
    const user = await userServ.findUserById(id)
    if(!user) return res.status(404).json(resObj)

    resObj.data = user

    return res.status(200).json(resObj)

  } catch (err) {
    console.log(err)
    return res.status(500).json({})
  }
}

async function enableUserById(req, res) {
  try {

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken
    const { id } = req.body
    if(!id) return res.status(400).json(resObj)
      
    await userServ.enableUserById(id)
    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json({})
  }
}

async function disableUserById(req, res) {
  try {

    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    const { id } = req.body
    if(!id) return res.status(400).json(resObj)
    await userServ.disableUserById(id)

    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json({})
  }
}

async function updateUser(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    const { id } = req.params
    if(!id) return res.status(400).json(resObj)
    const { full_name, username, profile } = req.body
    if(!full_name || !username || !profile) return res.status(400).json(resObj)

    await userServ.updateUser(id, full_name, username, profile)

    return res.status(200).json(resObj)

  } catch (err) {
    console.log(err)
    return res.status(500).json({})
  }
}

async function changePasswordOverride(req,res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    const { id } = req.params
    if(!id) return res.status(400).json(resObj)
    const { password } = req.body
    if(!password || password.length < 8) return res.status(400).json(resObj)

    const passwordHash = cripServ.hashPassword(password)
    await userServ.changePasswordOverride(id, passwordHash)

    await sessionServ.logoffAllSessions(id)

    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json({})
  }
}

async function changePassword(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    
    const { id } = req.params
    if(!id) return res.status(400).json(resObj)
      
      const token = req.headers["authorization"].split(" ")[1]
      const usersSession = await sessionServ.userOwnsToken(id, token)
      
      if(!usersSession) return res.status(401).json(resObj)
        
        const { password } = req.body
        if(!password || password.length < 8) return res.status(400).json(resObj)
          
    const passwordHash = cripServ.hashPassword(password)
    await userServ.changePasswordOverride(id, passwordHash)

    await sessionServ.logoffAllSessions(id)

    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json({})
  }
}

async function deleteUser(req, res) {
  try {
    const resObj = {}
    if(req.newToken) resObj.token = req.newToken

    const { id } = req.params
    if(!id) return res.status(400).json(resObj)
    await userServ.deleteUserById(id)

    return res.status(200).json(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).json({})
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
  changePassword,
  changePasswordOverride
}