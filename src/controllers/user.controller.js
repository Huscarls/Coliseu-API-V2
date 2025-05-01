const userServ = require("../services/user.service.js")
const cripServ = require("../services/criptography.service.js")

async function createUser(req, res) {
  try {
    const { full_name, username, password, id_clan } = req.body
    if (!full_name || !username || !password || !id_clan) return res.status(400).send()
    if (!String(full_name).trim() || !String(username).trim() || !String(password).trim()) return res.status(400).send()
    const passwordHash = cripServ.hashPassword(password)
    await userServ.createUser(full_name.trim(), username.trim(), passwordHash, id_clan)

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

module.exports = {
  createUser,
  getUsers
}