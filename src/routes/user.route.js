const controller = require("../controllers/user.controller.js")

const route = require("express").Router()

route.get("/", controller.getUsers)

route.post("/new", controller.createUser)

route.patch("/enable", controller.enableUserById)
route.patch("/disable", controller.disableUserById)

module.exports = route
