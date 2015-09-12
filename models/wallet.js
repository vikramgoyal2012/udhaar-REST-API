/**
 * Created with JetBrains PhpStorm.
 * User: vikram.go
 * Date: 9/9/15
 * Time: 12:20 PM
 * To change this template use File | Settings | File Templates.
 */


var db = require('./../lib/databasehandler.js');

function Wallet() {}

Wallet.prototype.create = function(walletdetails,cb) {
    var query = "Insert into wallet (contactno,aadhaarno,balance,creditlimit) values ($1,$2,$3,$4)",
        values = [walletdetails.contactno,walletdetails.aadhaarno,walletdetails.balance,walletdetails.creditlimit],
        queryObj;
    queryObj = {
        text : query,
        values : values
    };
    db.execute(queryObj, function (err, result) {
        if(err) {
            cb(err,null);
            return;
        }
        else if(result.rowCount == 0) {
            cb("Insert of new wallet failed",null);
            return;
        }
        cb(null,result);
    })
};


Wallet.prototype.fetch = function(contactno,cb) {
    var query = "Select * from wallet where contactno = $1",
        values = [contactno],
        queryObj;
    queryObj = {
        text : query ,
        values : values
    };
    db.execute(queryObj,function (err, result) {
        if(!err) {
            cb(null,result.rows);
            return
        }
        cb(err,null);
    })
};

//update details should be an object containing all the key value pairs which are to be updated.
Wallet.prototype.update = function(updatedetails, contactno, cb) {
    var query = "Update wallet set",
        values = [contactno],
        queryObj;
    Object.keys(updatedetails).forEach(function (key) {
        query += ' ' + key + ' = ' + updatedetails[key] + ',';
    });
    query = query.slice(0,-1);
    query += 'where contactno = $1';
    queryObj = {
        text : query ,
        values : values
    };

    db.execute(queryObj,function (err, result) {
        if(!err) {
            cb(null,result);
            return
        }
        cb(err,null);
    })
};

module.exports = Wallet;