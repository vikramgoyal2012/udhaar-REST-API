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
    User = require('./../models/users');

//Get All Users
router.get('/', function(req,res) {
    var user;
    user = new User();
    user.fetchAll(function (err, result) {
        if(err) {
            res.send(staticutil.failureMessage(err));
            return;
        }
        res.send(staticutil.successMessage(result));
    })
});

//Get User
router.post('/', function (req,res) {
        var user;
        console.log(req.body);
        if(!(req.body.contactno && req.body.password)) {
                res.send(staticutil.failureMessage('Empty Parameters'));     //Send in object form
                return;
        }
        user = new User();
        user.fetch(req.body.contactno,req.body.password, function(err, result) {
            if(err) {
                res.send(staticutil.failureMessage(err));
                return;
            }
            res.send(staticutil.successMessage(result));
        });
});

//Add User
router.put('/', function (req,res) {
    var userdetails,
        user;
    if(!req.body.contactno || !req.body.password || !req.body.name) {
        res.send(staticutil.failureMessage('Insufficient Details For Registration'));
        return;
    }
    userdetails = {
        'contactno' : req.body.contactno,
        'password' : req.body.password,
        'name' : req.body.name
    };
    userdetails.aadhaarno = req.body.aadhaarno || null;
    userdetails.email = req.body.email || null;
    user = new User();
    user.create(userdetails, function (err, result) {
        if(err) {
            res.send(staticutil.failureMessage(err));
            return;
        }
        res.send(staticutil.successMessage(result));
    });
});

//Update User
router.put('/update', function (req, res) {
        res.send(staticutil.failureMessage('Update functionality not available yet'));
})
//Delete User
router.delete('/', function (req,res) {
    res.send(staticutil.failureMessage('Delete functionality not available yet'));
})

module.exports = router;
