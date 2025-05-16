const controller = require("../controllers/user.controller.js")


const route = require("express").Router()

route.get("/", controller.getUsers)
route.get("/:id", controller.getUser)

route.post("/new", controller.createUser)

route.patch("/enable", controller.enableUserById)
route.patch("/disable", controller.disableUserById)
route.patch("/update/:id", controller.updateUser)
route.patch("/change-password/:id", controller.changePasswordOverride)

route.delete("/:id", controller.deleteUser)

module.exports = route
