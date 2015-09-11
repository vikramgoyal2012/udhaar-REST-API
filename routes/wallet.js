/**
 * Created with JetBrains PhpStorm.
 * User: vikram.go
 * Date: 9/9/15
 * Time: 12:19 PM
 * To change this template use File | Settings | File Templates.
 */


var express = require('express'),
    router = express.Router(),
    pg = require('pg'),
    staticutil = require('./../lib/staticutil'),
    Wallet = require('./../models/wallet');

//A new wallet account is inserted in the table every time a new user is successfully registered


//get the wallet details }(balance/credit limit) by passing userid(phone number/ aadhaar number)
router.get('/', function (req,res) {

});

//Recharge - add money to the wallet. Will update the wallet balance.
router.put('/recharge', function(req,res) {
});

//Update the credit limit
router.put('/creditlimit', function(req,res) {

});

//Transact is called whenever the wallet is used to make a payment somewhere
router.put('/transact', function (req, res) {

});

module.exports = router;