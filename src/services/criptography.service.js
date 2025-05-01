const bcrypt = require("bcrypt")

const SECRET = Number(process.env.SECRET)

function hashPassword(password){
  const hashedPassword = bcrypt.hashSync(password,SECRET
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