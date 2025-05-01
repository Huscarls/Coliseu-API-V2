const controller = require("../controllers/user.controller.js")

const route = require("express").Router()

route.get("/", controller.getUsers)

route.post("/new", controller.createUser)

module.exports = route
