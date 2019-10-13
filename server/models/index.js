const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(module.filename)
const config = require('../config/index.js')

const db = {}

let sequelize
if (config.DB.use_env_variable) {
  sequelize = new Sequelize(process.env[config.DB.use_env_variable])
} else {
  sequelize = new Sequelize(
    config.DB.database,
    config.DB.username,
    config.DB.password,
    config.DB
  )
}

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
