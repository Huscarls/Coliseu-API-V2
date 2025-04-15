const controller = require("../controllers/weapon.controller.js")

const route = require("express").Router()

route.get("/all", controller.getAllWeapons) //
route.get("/:id", controller.getWeaponById) //

route.post("/new", controller.postWeapon) //

module.exports = route