require("dotenv").config();

const { createDatabase } = require("./database/dbCreation")

createDatabase()

const express = require("express")
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors());

const { validateSession, isAdmin } = require("./middleware/session.middleware.js")

const authRoutes = require("./routes/auth.route.js")
app.use("/auth", authRoutes)

const userRoutes = require("./routes/user.route.js")
app.use("/user", validateSession, isAdmin, userRoutes)

const clanRoutes = require("./routes/clan.route.js")
app.use("/clan", validateSession, clanRoutes)

const swordplayerRoutes = require("./routes/swordplayer.route.js")
app.use("/swordplayer", swordplayerRoutes)

const combatRoutes = require("./routes/combat.route.js")
app.use("/combat", combatRoutes)

const weaponRoutes = require("./routes/weapon.route.js")
app.use("/weapon", validateSession, weaponRoutes)

app.get("/health", async (req, res) => {
  const healthData = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: "OK",
    timestamp: Date.now()
  }
  try {
    resObj = {data: healthData}
    if(req.newToken) resObj.token = req.newToken
    return res.status(200).send(resObj)
  } catch (err) {
    console.log(err)
    return res.status(500).send()
  }
})

module.exports = app