const controller = require("../controllers/user.controller.js")
const { isAdmin } = require("../middleware/session.middleware.js")


const route = require("express").Router()

route.get("/", isAdmin, controller.getUsers)
route.get("/:id", isAdmin, controller.getUser)

route.post("/new", isAdmin, controller.createUser)

route.patch("/enable", isAdmin, controller.enableUserById)
route.patch("/disable", isAdmin, controller.disableUserById)
route.patch("/update/:id", isAdmin, controller.updateUser)
route.patch("/change-password/:id", controller.changePassword)
route.patch("/change-password-override/:id", isAdmin, controller.changePasswordOverride)

route.delete("/:id", isAdmin, controller.deleteUser)

module.exports = route
