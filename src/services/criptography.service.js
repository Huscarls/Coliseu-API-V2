const bcrypt = require("bcrypt")

const SALT = Number(process.env.SALT)

function hashPassword(password){
  const hashedPassword = bcrypt.hashSync(password,SALT
    , (err, hash)=> {return hash})
  return hashedPassword
}

function  compareToHash(password, hash){
  const hashResult = bcrypt.compareSync(password, hash, (err, res) => {return res})
  return hashResult
}

module.exports = {
  hashPassword,
  compareToHash
}