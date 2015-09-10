/**
 * Created with JetBrains PhpStorm.
 * User: vikram.go
 * Date: 9/9/15
 * Time: 12:20 PM
 * To change this template use File | Settings | File Templates.
 */

var db = require('./../lib/databasehandler.js');

function User() {}

User.prototype.create  = function(userdetails, cb) {
    var query = "Insert into users (contactno,password,name,aadhaarno,email) values ($1,$2,$3,$4,$5)",
        values = [userdetails.contactno,userdetails.password,userdetails.name,userdetails.aadhaarno,userdetails.email],
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
}

User.prototype.update = function(User) {

}

User.prototype.fetch = function(contactNo, password, cb) {
        var query = "Select * from users where contactno = $1 and password = $2",
            values = [contactNo,password],
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
}

User.prototype.fetchAll = function(cb) {
    var query = "Select * from users",
        queryObj = {
            text : query
        };
        db.execute(queryObj, function (err, result) {
           if(!err) {
               cb(null,result.rows);
               return;
           }
           cb(err,null);
        })
}

User.prototype.delete = function(contactNo) {

}

module.exports = User;