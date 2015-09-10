/**
 * Created with JetBrains PhpStorm.
 * User: vikram.go
 * Date: 9/10/15
 * Time: 3:53 PM
 * To change this template use File | Settings | File Templates.
 */

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