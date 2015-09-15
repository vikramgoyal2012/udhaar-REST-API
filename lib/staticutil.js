/**
 * Created with JetBrains PhpStorm.
 * User: vikram.go
 * Date: 9/10/15
 * Time: 3:53 PM
 * To change this template use File | Settings | File Templates.
 */

var config = require('./../config/config');

function successMessage(result) {
    return {
        'Status' : 'Success',
        'Result' : result
    };
}
exports.successMessage = successMessage;

function failureMessage(err) {
    return {
        'Status': 'Failure',
        'Reason' : err,
        'Result' : []
    }
}
exports.failureMessage = failureMessage

function modeofPayment(description) {
    var mode;
    switch (description) {
        case 'Cash':
            mode = 1;
            break;
        case 'E-Wallet':
            mode = 2;
            break;
        case 'Debit Card':
            mode = 3;
            break;
        case 'Credit Card':
            mode = 4;
        default :
            mode = 5;
    }
    return mode;

}
exports.modeofPayemnt = modeofPayment;

function getRadian(x) {
    return x * Math.PI / 100;
}

function getHaversineDistance(source,destination) {
    console.log("point1",source);
    console.log("point2",destination);
    var dlat = getRadian(destination.x - source.x),
        dlon = getRadian(destination.y - source.y),
        a,
        c,
        distance;
    console.log('dlat',dlat);
    console.log('dlong',dlon);
    a = (Math.sin(dlat/2))*(Math.sin(dlat/2)) +
            Math.cos(getRadian(source.x)) * Math.cos(getRadian(destination.x)) * (Math.sin(dlon/2)) * (Math.sin(dlon/2));
    console.log('a',a);
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    console.log('c',c);
    distance = config.EARTHRADIUS * c;
    console.log("distance",distance);

}

function getEquiRectangularProjectionDistance(source, destination) {          //Approximation of Haversine Distance
    var x = (getRadian(destination.y - source.y))*Math.cos(0.5*(getRadian(source.x) + getRadian(destination.x))),
        y = getRadian(destination.x - source.x),
        distance = Math.sqrt(x*x + y*y)*config.EARTHRADIUS;
    return distance;
}
exports.getEquiRectangularProjectionDistance = getEquiRectangularProjectionDistance;

function isStringSet(str) {
    return str !== undefined && str !== '';
}
exports.isStringSet = isStringSet;