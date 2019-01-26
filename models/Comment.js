'use strict';

let db   = require('../db');
let post = require('./post');

let Comment = db.define('comment', {
        id: {
            type: db._Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        comment_value: {
            type: db._Sequelize.STRING,
            allowNull: false
        },
        comment_date: {
            type: db._Sequelize.DATE,
            allowNull: false,
            defaultValue: db._Sequelize.NOW
        },
        post_id: {
            type: db._Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: post,
                key: 'id',
            }
        }
    },
    {
        freezeTableName: true
    }
);


module.exports = Comment;
