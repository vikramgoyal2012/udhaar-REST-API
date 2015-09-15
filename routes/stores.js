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
    store = require('./../models/stores'),
    Store;

Store = new store();
/*Table Structure
    Value       Type                          Purpose
    storeid     AutoIncrementPrimary Key    Used for referring to store in all other tables
    name        varchar                     name of the store
    categoryid  int                         kind of service provided by store(pharmacy,karyana,restaurant)
    contactno   int                         contact number of the store
    ownerid     varchar                     pannumber/aadhaarnumber of the store owner
    address     varchar                     housenumber/streetnumber part of the address
    state       varchar                     --
    city        varchar                     --
    area        varchar                     to identify the sub area in the city (eg. MIDC, andheri east in Mumbai)
    location    Point                       (latitude,longitude) value of the store
 */

//list of nearby stores. Latitude and longitude information to be passed in the query
router.get('/', function(req,res) {
    /*
        Out of city,state,area whichever parameters are there use them for making the select query
    */
    Store.get(req.body, function (err, result) {
        if(err) {
            res.send(staticutil.failureMessage(err));
            return;
        }
        res.send(staticutil.successMessage(result));
    });
});

//add a store
router.put('/', function(req,res) {
    var storedetails = req.body;
    if(!isValidStoreDetails(storedetails)) {
        res.send(staticutil.failureMessage('Please enter valid data'));
        return;
    }
    Store.create(req.body, function (err, result) {
            if(err) {
                res.send(staticutil.failureMessage(err));
                return;
            }
            res.send(staticutil.successMessage(result));
    });
});

//remove a store
router.delete('/', function(req,res) {

});


function isValidStoreDetails(storedetails) {
    return (storedetails.name && storedetails.categoryid && storedetails.ownerid &&
           storedetails.address && storedetails.state && storedetails.city && storedetails.area);
}
module.exports = router;