'use strict';

let db   = require('../db');

let Post = db.define('post', {
        id: {
            type: db._Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        post_value: {
            type: db._Sequelize.STRING,
            allowNull: false
        },
        post_date: {
            type: db._Sequelize.DATE,
            allowNull: false,
            defaultValue: db._Sequelize.NOW
        }
    },
    {
        freezeTableName: true
    }
);


module.exports = Post;
