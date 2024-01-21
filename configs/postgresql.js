/**
 * PostgreSQL configuration.
 */

'use strict'

require('dotenv').config()

const { Sequelize } = require('sequelize')

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

try {
    sequelize.authenticate()
        .then(r =>
            console.log('INFO: Connection to database has been established successfully.')
        );
} catch (err) {
    console.log('ERROR: Unable to connect to the database - ', err)
}

const db = {};

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db