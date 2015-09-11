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
    Store = require('./../models/transactions');

//list of nearby stores. Latitude and longitude information to be passed in the query
router.get('/', function(req,res) {
    res.send("You successfully reached the stores route");
});

//add a store
router.put('/', function(req,res) {

});

//remove a store
router.delete('/', function(req,res) {

});

module.exports = router;