'use strict';

let db = require('../db');
let User = require('../models/user');
let Post = require('../models/post');
let Comment = require('../models/comment');

Post.hasMany(Comment, {foreignKey: 'post_id', onDelete: 'CASCADE', hooks: true});

db.sync();
