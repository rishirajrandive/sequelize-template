'use strict';

let db = require('../db');
let User = require('../models/user');
let Post = require('../models/post');
let Comment = require('../models/comment');

let userData = [
    {
        id: 1,
        first_name: 'Shreay',
        last_name: 'Randive',
        email: 'chindi.chaman@gmail.com',
        password: "xyz",
        phone_number: '12344343',
        source: 'Manual'

    },
    {
        id: 7,
        first_name: 'Shim',
        last_name: 'Zhang',
        email: 'shim.zhang@gmail.com',
        password: 'charles123',
        phone_number: '98494545',
        source: 'Manual'

    }
];

let postData = [
    {
        id: 1,
        post_value: 'Cleaning Cleaning Cleaning Cleaning Cleaning',
    },
    {
        id: 2,
        post_value: 'Cooking Cooking Cooking Cooking Cooking Cooking',
    }
];

let commentsData = [
    {
        comment_value: 'hey hey hey hye',
        post_id: 1,
    },
    {
        comment_value: 'ho ho hoho ',
        post_id: 1,
    },
    {
        comment_value: 'xoxoxoxox',
        post_id: 2,
    }
];

User.bulkCreate(userData).then(() => {
    return User.findAll();
}).then(user => {
    console.log('User data entered');

    Post.bulkCreate(postData).then(() => {
        return Post.findAll();
    }).then(task => {
        console.log('Task data entered');

        Comment.bulkCreate(commentsData).then(() => {
            return Comment.findAll();
        }).then(taskAssignedTo => {
            console.log('TaskAssignedTo data entered');
        });
    });
});
