const express = require('express');

const loanRoute = express.Router();

const LoanController = require('../controllers/loan.controller');

loanRoute.post('/request-loan', LoanController.RequestLoan);

loanRoute.get('/get-loans', LoanController.getloan);

loanRoute.post('/pay-loans', LoanController.payOffLoan);

loanRoute.get('/get-gift', LoanController.getGift);

loanRoute.post('/redeem-gift', LoanController.redeemGift);
module.exports = loanRoute;