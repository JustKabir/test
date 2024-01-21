require('dotenv').config()

module.exports = {
    development: {
        url: process.env.DEV_DATABASE_URL,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false, // Depending on your PostgreSQL server setup
            },
          },
        host:'dfsa.c7maquuc8i3q.eu-north-1.rds.amazonaws.com'
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        dialect: 'postgres',
        logging: false

    },
    production: {
        url: process.env.DEV_DATABASE_URL,
        dialect: 'postgres',
        host:'dfsa.c7maquuc8i3q.eu-north-1.rds.amazonaws.com'
    },
}