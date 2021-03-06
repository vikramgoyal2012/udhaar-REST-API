/**
 * Created with JetBrains PhpStorm.
 * User: vikram.go
 * Date: 9/10/15
 * Time: 12:51 AM
 * To change this template use File | Settings | File Templates.
 */

var config = require('./../config/config'),
    pg = require('pg');

function getDBConfig()
{
    var dburl = 'postgres://vphmltidopdxtf:D_z36FSkeYXDR7UToSa7_cnaj4@ec2-54-83-51-0.compute-1.amazonaws.com:5432/d70o6go1c56fjg?ssl=true';
    return dburl;
    /*if(process.env.PORT) {      //APP is running on cloud
        return dburl;
    }
    return {
        user : config.SERVER_USERNAME,
        password : config.SERVER_PAASSWORD,
        host : config.HOST,
        port : config.DATABASESERVER_PORT,
        database : config.DATABASE
    }*/
}

exports.execute = function(queryObj,cb) {
    var query;
    console.log(queryObj);
    pg.connect(getDBConfig(), function(err, client, done) {
        if(err) {
            console.log("Following error encountered while connecting", err);
            cb(err,null);
            return;
        }

        query = client.query(queryObj);     //execute the query. Query object is in the following format {text : '', value : ''}

        query.on('error', function (err) {                  //error while executing the query
            console.log("Following error encountered while executing query",err);
            cb(err,null);
        });

        query.on('row', function (row,result) {     //a row received from POSTgres
            result.addRow(row);
        })

        query.on('end', function (results) {       //query execution completed
            done();
            cb(null,results);
        })
    })
}

