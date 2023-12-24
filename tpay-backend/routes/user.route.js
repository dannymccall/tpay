const express = require('express');

const userRoute = express.Router();

const userAuthController = require('../controllers/user.controller');

userRoute.post('/register-user', userAuthController.RegisterUser);

userRoute.post('/verify-code', userAuthController.VerifyCode);

userRoute.get('/get-user-details', userAuthController.GetUserDetails);

userRoute.post('/verify-id-card', userAuthController.VerifyIDCardNumber)

module.exports = userRoute;