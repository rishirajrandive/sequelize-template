'use strict';

let User = require('../models/user');
let Post = require('../models/post');
let Comment = require('../models/comment');

User.drop();
Comment.drop().then(() => {
    Post.drop();
});
