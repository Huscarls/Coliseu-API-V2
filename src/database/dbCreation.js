const { db } = require("./dbConnect.js")

const userService = require("../services/user.service.js")
const clanService = require("../services/clan.service.js")
const weaponService = require("../services/weapon.service.js")
const cripService = require("../services/criptography.service.js")

const TABLES = ["clans", "users", "sessions", "swordplayers", "weapons", "combats"]
const WEAPONS = ["haste", "dual", "long", "single", "escudo", "arco", "exótica"]

async function getAllNames(){
  
  const query = "SHOW TABLES;"
  const [tablesObj, _] = await db.query(query)
  const tables = tablesObj.map( tb => tb["Tables_in_" + process.env.DB_DATABASE])
  return tables
}

const creationQuery = {

  "sessions": `CREATE TABLE sessions (
    id_user CHAR(36) NOT NULL,
      FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(512) NOT NULL PRIMARY KEY
  );`,

  'users': `CREATE TABLE users (
	id CHAR(36) NOT NULL UNIQUE PRIMARY KEY,
  password_hash CHAR(60) NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    username VARCHAR(30) NOT NULL UNIQUE,
    id_clan CHAR(36) NOT NULL,
      FOREIGN KEY (id_clan) REFERENCES clans(id) ON DELETE CASCADE,
    is_enabled BOOL NOT NULL DEFAULT TRUE,
    creation_timestamp DATETIME NOT NULL DEFAULT NOW(),
    is_leader BOOL NOT NULL DEFAULT FALSE,
    is_staff BOOL NOT NULL DEFAULT FALSE,
    is_admin BOOL NOT NULL DEFAULT FALSE
);`,

  'clans': `CREATE TABLE clans (
    id CHAR(36) NOT NULL UNIQUE PRIMARY KEY,
    full_name VARCHAR(50) NOT NULL UNIQUE,
    abbreviation VARCHAR(6) NOT NULL UNIQUE,
    creation_timestamp DATETIME NOT NULL DEFAULT NOW()
);`,

  'swordplayers': `CREATE TABLE swordplayers (
    id INT NOT NULL UNIQUE PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(70) NOT NULL,
    nickname VARCHAR(30) NOT NULL,
    id_clan CHAR(36) NOT NULL,
      FOREIGN KEY (id_clan) REFERENCES clans(id) ON DELETE CASCADE,
    is_enabled BOOL NOT NULL DEFAULT TRUE,
    creation_timestamp DATETIME NOT NULL DEFAULT NOW(),
    id_creator CHAR(36)
);`,

  'weapons': `CREATE TABLE weapons (
    id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    \`name\` VARCHAR(20)
    );`,

  'combats': `CREATE TABLE combats (
    id INT NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    id_swp1 INT NOT NULL,
      FOREIGN KEY (id_swp1) REFERENCES swordplayers(id) ON DELETE CASCADE,
    id_weapon1 INT NOT NULL,
      FOREIGN KEY (id_weapon1) REFERENCES weapons(id) ON DELETE CASCADE,
    rounds_scored1 INT NOT NULL,
      CHECK (rounds_scored1 > -1),
    id_swp2 INT NOT NULL,
      FOREIGN KEY (id_swp2) REFERENCES swordplayers(id) ON DELETE CASCADE,
    id_weapon2 INT NOT NULL,
      FOREIGN KEY (id_weapon2) REFERENCES weapons(id) ON DELETE CASCADE,
    rounds_scored2 INT NOT NULL,
      CHECK (rounds_scored2 > -1),
    id_creator CHAR(36),
    CHECK (id_swp1 < id_swp2)
);`
}

async function createDatabase(){
  try {
    const tablesFound = await getAllNames();

    for (const table of TABLES){
      if (tablesFound.includes(table)) continue
      const query = creationQuery[table]
      await db.query(query)
      console.log(`Created table: ${table}`)
    }
    console.log("Database online")
    console.log("Populating database")
    populateDatabase()
  } catch (err) {
    console.log(err)
    console.log("Please create the database on MySQL manually")
    process.exit(1)
  }
}

async function populateDatabase() {
  const clan = await clanService.getClanByFullName("shields")
  if(!clan) await clanService.newClan("shields", "SHD")

  const clans = await clanService.getAllClans()
  let clanId = ""
  for(let i = 0; i < clans.length; i++){
    if(clans[i].full_name == "shields") clanId = clans[i].id
  }

  const users = await userService.getUsers()
  let adminId = ""
  if(users.length > 0){
    for(let i = 0; i < users.length; i++){
      if(users[i].full_name == "admin") {
        adminId = users[i].id
        break
      }
    }
  }
  if(!adminId) {
    console.log("Populating with admin")
    await userService.createUser("admin", "admin", cripService.hashPassword("1234567890"), clanId, "admin")
  }

  const weapons = await weaponService.getAllWeapons()
  if(!(weapons.length >= WEAPONS.length)){
    for(let i = 0; i < WEAPONS.length; i++){
      console.log("Populating weapon: " + WEAPONS[i])
      await weaponService.newWeapon(WEAPONS[i])
    }
  }

  console.log("Finished population")
}

module.exports = {
  createDatabase
}