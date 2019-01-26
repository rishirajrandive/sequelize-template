'use strict';

let User = require('../../models/User');
let checkUtil = require('../../utils/checkUtil');
let db = require('../../db');

module.exports = {
    login: {
        get(req, res) {
            res.render('index', {title: 'Henlo'});
        },
        post(req, res) {

            if (checkUtil.isEmpty(req.body)) {
                res.send({status_code: 400, msg: 'No message body found, bad request', data: {}});
                return;
            }

            if (checkUtil.isEmpty(req.body.email)) {
                res.send({
                    status_code: 400, msg: 'Bad request. One of the required param is not found. Required are ' +
                        '{email, password}', data: {}
                });
                return;
            }

            // Manual login
            if (req.body.password != null) {
                User.findOne({
                    where: {email: req.body.email}
                }).then(user => {
                    console.log(user);
                    if (user != null) {
                        // Comparing input password with hash in DB
                        if (bcrypt.compareSync(req.body.password, user.password)) {
                            req.session.user_email = user.email;
                            req.session.user_id = user.id;
                            console.log("Session initialized for : " + req.session.user_email);
                            let response = {
                                status_code: 200,
                                msg: 'Login successful',
                                data: user
                            };
                            res.send(response);
                        } else {
                            let msg = 'Entered password is not valid';
                            if (user.source == constants.getLoginType(2)) {
                                msg = 'We have you registered using Google, please Continue with Google';
                            } else if (user.source == constants.getLoginType(3)) {
                                msg = 'We have you registered using Facebook, please Continue with Facebook';
                            }
                            let response = {
                                status_code: 400,
                                msg: msg,
                                data: null
                            };
                            res.send(response);
                        }
                    } else {
                        res.send({
                            status_code: 400,
                            msg: 'Entered email is not valid',
                            data: {}
                        });
                    }
                })
            } else {
                // This happens when using Facebook or Google for login
                User.findOne({
                    where: {email: req.body.email}
                }).then(user => {
                    console.log(user);
                    if (user != null) {
                        req.session.user_email = user.email;
                        req.session.user_id = user.id;
                        console.log("Session initialized for : " + req.session.user_email);
                        let response = {
                            status_code: 200,
                            msg: 'Login successful',
                            data: user
                        };
                        res.send(response);
                    } else {
                        let response = {
                            status_code: 400,
                            msg: 'Entered credentials are not valid',
                            data: null
                        };
                        res.send(response);
                    }
                })
            }
        }
    },
    findProfileById: {
        get(req, res) {
            User.findAll({
                where: {id: req.params.id},
                attributes: ['id', 'first_name', 'last_name', 'email', 'phone_number', 'photo_url']
            }).then(user => {
                if (user.length == 1) {
                    let response = {
                        status_code: 200,
                        msg: 'user profile founded',
                        data: user,
                    };
                    res.send(response)
                } else {
                    let response = {
                        status_code: 200,
                        msg: 'data not found'
                    };
                    res.send(response)
                }

            }).catch(err => {
                console.log("in error " + err);
                let response = {
                    status_code: 500,
                    msg: 'fetching profile error'
                };
                res.send(response);
            });
        }
    },
    findProfileByName: {
        get(req, res) {
            User.findAll({
                where: {
                    first_name: req.params.first_name,
                    last_name: req.params.last_name
                },
                attributes: ['id', 'first_name', 'last_name', 'email', 'phone_number', 'photo_url']
            }).then(user => {
                if (user.length > 0) {
                    let response = {
                        status_code: 200,
                        msg: 'user profile founded',
                        data: user,
                    };
                    res.send(response)
                } else {
                    let response = {
                        status_code: 200,
                        msg: 'data not found'
                    };
                    res.send(response)
                }

            }).catch(err => {
                console.log("in error " + err);
                let response = {
                    status_code: 500,
                    msg: 'fetching profile error'
                };
                res.send(response);
            });
        }
    },
    findProfileByEmail: {
        get(req, res) {
            User.findAll({
                where: {email: req.params.email},
                attributes: ['id', 'first_name', 'last_name', 'email', 'phone_number', 'photo_url']
            }).then(user => {
                if (user.length == 1) {
                    let response = {
                        status_code: 200,
                        msg: 'user profile founded',
                        data: user,
                    };
                    res.send(response)
                } else {
                    let response = {
                        status_code: 200,
                        msg: 'data not found'
                    };
                    res.send(response)
                }

            }).catch(err => {
                console.log("in error " + err);
                let response = {
                    status_code: 500,
                    msg: 'fetching profile error'
                };
                res.send(response);
            });
        }
    },
    searchUser: {
        get(req, res) {
            if (checkUtil.isEmpty(req.params.term) || req.params.term.length < 3) {
                let response = {
                    status_code: 400,
                    msg: 'Either search term is not present or less than 2',
                    data: {}
                };
                res.send(response);
                return;
            }
            let search_term = req.params.term + '%';
            db.query('SELECT email, id, first_name, last_name, phone_number, photo_url FROM user WHERE first_name LIKE :search_name ',
                {replacements: {search_name: search_term}, type: db.QueryTypes.SELECT}
            ).then(users => {
                console.log('Users found for the search term ' + users);
                let response = {
                    status_code: 200,
                    msg: 'Found users for search term',
                    data: users
                };
                res.send(response);
            });
        }
    }
};