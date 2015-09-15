/**
 * Created with JetBrains PhpStorm.
 * User: vikram.go
 * Date: 9/9/15
 * Time: 12:22 PM
 * To change this template use File | Settings | File Templates.
 */

var db = require('./../lib/databasehandler.js');

function Store() {}

Store.prototype.create = function(storedetails, cb) {
    var query = "Insert into stores (name,categoryid,contactno,ownerid,address,state,city,area,location) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
        values = [
            storedetails.name,
            storedetails.categoryid,
            storedetails.contactno || null,
            storedetails.ownerid,
            storedetails.address,
            storedetails.state,
            storedetails.city,
            storedetails.area,
            storedetails.location || null
        ],
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
            cb("Insert Failed",null);
            return;
        }
        cb(null,result);
    })
};

Store.prototype.get = function(storedetails,cb) {
    var query = "Select * from stores where",
        values = [],
        i= 1,
        queryObj;
    Object.keys(storedetails).forEach(function (key) {
        query += ' ' + key + ' ~* $' +i+ ' and ';
        values.push(storedetails[key]);
        i++;
    });
    query = query.slice(0,-5);
    console.log(query);
    queryObj = {
        text : query,
        values : values
    };
    db.execute(queryObj, function (err, result) {
        if(!err) {
            cb(null,result.rows);
            return;
        }
        cb(err,null);
    })
};

Store.prototype.remove = function(storeID, cb) {

};

module.exports = Store;