const jwt = require('jsonwebtoken');
const secrets = require('./../config/secrets');
const User = require('./../models/Users');
const { createResponse } = require('./Controllers.Helpers');

function authenticate(req, res, next) {
    User.findOne({
        email: req.body.email
    }).then(user => {
        user.verifyPassword(req.body.password).then(valid => {
            if (valid) {
                req.user = user;
                next();
            } else {
                console.log('invalid credential')
                next(new Error('Invalid credentials'))
            }
        }).catch(err => {
            console.log(err)
            next(err)
        })
    }).catch(error => {
        console.log(error);
        next(error);
    })
}

function GenerateToken(req, res, next) {
    console.log('generando token', req.user);
    if (!req.user) return next();

    req.token = jwt.sign({
        id: req.user._id
    }, secrets.jwtSecret);
    next();
}

function SendTokenAndInfo(req, res) {
    if (req.user) {
        let responseToClientSuccessFully = createResponse(
            false,
            201,
            "User create successfully", {
                user: req.user,
                jwt: req.token
            }
        );
        res.json(responseToClientSuccessFully);
    } else {
        let responseToCLientError = createResponse(true, 500, "Error to created the user", err.errors)
        res.json(responseToCLientError);
    }
}




module.exports = {
    GenerateToken,
    SendTokenAndInfo
}