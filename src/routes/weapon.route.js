const controller = require("../controllers/weapon.controller.js")

const route = require("express").Router()

// route.get("/:id", controller.getWeaponById)
route.get("/", controller.getAllWeapons)

// route.post("/new", controller.postWeapon)

module.exports = route