const { SaveUserData } = require('../controller/AuthController');

const AuthRouter = require('express').Router();

AuthRouter.post('/save-user', SaveUserData );

module.exports = AuthRouter;