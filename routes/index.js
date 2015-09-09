/**
 * Created with JetBrains PhpStorm.
 * User: vikram.go
 * Date: 9/9/15
 * Time: 12:28 PM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express'),
    router = express.Router();

router.use('/stores',require('./stores'));
router.use('/transactions',require('./transactions'));
router.use('/users',require('./users'));
router.use('/wallet',require('./wallet'));

module.exports = router;
