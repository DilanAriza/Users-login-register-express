const express = require('express');
const ControllersUsers = require('../controllers/Controllers.Users');
const ControllerSessions = require('../controllers/Controllers.Sessions');
const router = express.Router();


router.route('/register')
    .post(
        ControllersUsers.CreateUser,
        ControllerSessions.GenerateToken,
        ControllerSessions.SendTokenAndInfo
    )

router.route('/get')
    .get(
        ControllersUsers.GetAllUsers
    )

module.exports = router;