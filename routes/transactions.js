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
    Transaction = require('./../models/transactions');

//Get the transaction list in descending order of time.
//Parameters : userID (Phone/Aadhaar) and count (optional. default is 10)
router.get('/', function(req,res) {
    res.send("You successfully reached the transaction route");
});

//Add a new transaction. ToDo : When should we add it? after the payment is successful?
router.put('/', function (req, res) {

});


module.exports = router;
