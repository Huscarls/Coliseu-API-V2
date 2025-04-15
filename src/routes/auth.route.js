const controller = require("../controllers/auth.controller.js")

const route = require("express").Router()

route.post("/login", controller.login)
route.post("/logout", controller.logout)

module.exports = route
