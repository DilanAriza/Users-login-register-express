const User = require('../models/Users');
const createResponse = require('./Controllers.Helpers').createResponse;
const paramsBuilder = require('./Controllers.Helpers').paramsBuilder;
const validParams = ['email', 'name', 'password'];

//Basic response

function CreateUser(req, res, next) {
    let params = paramsBuilder(validParams, req.body);
    console.log(params)
    User.create(params).then(doc => {
        console.log('usuario creado');
        req.user = doc;
        next();
    }).catch(err => {
        console.log(err)
        let responseToCLientError = createResponse(true, 500, "Error in the create user", err)
        res.json(responseToCLientError);
    })
}

function GetAllUsers(req, res) {
    console.log('nice')
    User.find({}).then(users => {

        let responseToClient = createResponse(false, 302, "Users Finded", users)
        res.json(responseToClient);

    }).catch(err => {
        let responseToCLientError = createResponse(true, 500, "Error in the get users information", err.errors)
        res.json(responseToCLientError);
    })

}


module.exports = {
    CreateUser,
    GetAllUsers
};