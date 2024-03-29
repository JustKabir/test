'use strict';

require('dotenv').config()

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

let sequelize

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize("postgres",process.env.DEV_USERNAME, process.env.DEV_PASSWORD,{
    host: process.env.DEV_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Depending on your PostgreSQL server setup
      },
    },
})
} else if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(process.env.TEST_DATABASE_URL)
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL)
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;