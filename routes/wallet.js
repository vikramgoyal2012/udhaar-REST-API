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
    Wallet = require('./../models/wallet'),
    wallet = new Wallet();

//A new wallet account is inserted in the table every time a new user is successfully registered


//get the wallet details }(balance/credit limit) by passing userid(phone number/ aadhaar number)
router.get('/', function (req,res) {
    var contactno = req.query.contactno;
    if(!contactno) {
        res.send(staticutil.failureMessage('Contact Number Not Present'));
        return;
    }
    wallet.fetch(contactno, function (err,result) {
        if(err) {
            res.send(staticutil.failureMessage(err));
            return;
        }
        res.send(staticutil.successMessage(result));
    });
});

//Recharge - add money to the wallet. Will update the wallet balance.
router.put('/recharge', function(req,res) {
    var contactno = req.body.contactno,
        rechargeamount = req.body.rechargeamount,
        updatedetails;
    if(!contactno || !rechargeamount) {
        res.send(staticutil.failureMessage('Insufficient details'));
        return;
    }
    updatedetails = {'balance' : 'balance + ' + rechargeamount };
    wallet.update(updatedetails,contactno, function (err,result) {
       if(err) {
           res.send(staticutil.failureMessage(err));
           return;
       }
       res.send(staticutil.successMessage(result));
    });
});

//Update the credit limit
router.put('/creditlimit', function(req,res) {
    var contactno = req.body.contactno,
        creditlimit = req.body.creditlimit,
        updatedetails;
        if(!contactno || !creditlimit) {
            res.send(staticutil.failureMessage('Insufficient Details'));
            return;
        }
        updatedetails = {'creditlimit' : creditlimit};
        wallet.update(updatedetails,contactno, function (err,result) {
            if(err) {
                res.send(staticutil.failureMessage(err));
                return;
            }
            res.send(staticutil.successMessage(result));
        })
});

//Transact is called whenever the wallet is used to make a payment somewhere
router.put('/transact', function (req, res) {
    var contactno = req.body.contactno,
        moneyrequired = req.body.moneyrequired,
        existingbalance,
        creditlimit,
        updatedetails;
    if(!contactno || !moneyrequired) {
        res.send(staticutil.failureMessage('Insufficient details'));
        return;
    }
    wallet.fetch(contactno, function(err, result) {
        if(err) {
            res.send(staticutil.failureMessage(err));
            return;
        }
        if(result && result.rows && result.rows[0]) {
            existingbalance = result.rows[0].balance;
            creditlimit = result.rows[0].creditlimit;
            if(moneyrequired > existingbalance + creditlimit) {
                res.send(staticutil.failureMessage('Insufficient Balance. Credit Limit exceeded'));
                return;
            }
            updatedetails = {'balance' : 'balance - ' + moneyrequired};
            wallet.update(updatedetails,contactno, function (err,result){
                if(err) {
                    res.send(staticutil.failureMessage(err));
                    return;
                }
                res.send(staticutil.successMessage(result));
            })
        }
    })

});

module.exports = router;