'use strict';

require('dotenv').config();
let Sequelize = require('sequelize');
const db = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    port : process.env.MYSQL_PORT,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone: 'America/Los_Angeles'
});

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
db._Sequelize = Sequelize;

module.exports = db;