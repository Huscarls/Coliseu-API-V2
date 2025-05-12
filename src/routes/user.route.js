const controller = require("../controllers/user.controller.js")

const { isAdmin } = require("../middleware/checkSession.middleware.js")

const route = require("express").Router()

route.get("/", isAdmin, controller.getUsers)

route.post("/new", isAdmin, controller.createUser)

route.patch("/enable", isAdmin, controller.enableUserById)
route.patch("/disable", isAdmin, controller.disableUserById)

module.exports = route
