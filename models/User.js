'use strict';
let db   = require('../db');

//Define database table for Task Module
let User = db.define('user', {

        id:{
            type: db._Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name:{
            type: db._Sequelize.STRING,
            allowNull: false
        },
        last_name:{
            type: db._Sequelize.STRING,
            allowNull: true
        },
        email: {
            type: db._Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: db._Sequelize.STRING,
            allowNull: true
        },
        phone_number:{
            type: db._Sequelize.STRING,
            unique: true,
            allowNull: true
        },
        photo_url:{
            type: db._Sequelize.STRING,
            unique: true
        },
        source:{
            type: db._Sequelize.STRING,
            allowNull: false
        },
        fcm_token: {
            type: db._Sequelize.STRING,
            allowNull: true
        }
    },
    {
        freezeTableName: true
    }
);

module.exports = User;

