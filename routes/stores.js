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
    if(!(req.query.state || req.query.city || req.query.area)) {
        res.send(staticutil.failureMessage('Please enter a search filter'));
        return;
    }
    Store.get(req.query, function (err, result) {
        if(err) {
            res.send(staticutil.failureMessage(err));
            return;
        }
        res.send(staticutil.successMessage(getNearestStores(result,req)));
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
    return (staticutil.isStringSet(storedetails.name) && staticutil.isStringSet(storedetails.categoryid) &&
            staticutil.isStringSet(storedetails.ownerid) && staticutil.isStringSet(storedetails.address) &&
            staticutil.isStringSet(storedetails.state) && staticutil.isStringSet(storedetails.city) &&
            staticutil.isStringSet(storedetails.area));
}

function getNearestStores(stores,req) {
    var nearestStores = [],
        count = req.count || 5,
        userlocation = {},
        distance;
    userlocation = {
        x : req.latitude || 19.125731,
        y : req.longitude ||72.861259
    }
    stores.forEach(function (store) {
        distance = staticutil.getEquiRectangularProjectionDistance(userlocation,store.location);
        store.distance = distance;
    });

    stores.sort(function (a,b) {
        if(a.distance > b.distance) {
            return 1;
        }
        if(a.value < b.distance) {
            return -1;
        }
        return 0;
    });
    return stores;
}

module.exports = router;