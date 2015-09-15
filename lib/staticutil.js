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

function getHaversineDistance(x,y) {
    var dlon = x[0] - y[0],
        dlat = x[1] - y[1],
        a,
        c,
        distance;
    a = (Math.sin(dlat/2))^2 + Math.cos(x[1]) * Math.cos(x[2]) * (Math.sin(dlon/2))^2;
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distance = config.EARTHRADIUS * c;
    return distance;
}
exports.getHaversineDistance = getHaversineDistance;

function isStringSet(str) {
    return str !== undefined && str !== '';
}
exports.isStringSet = isStringSet;