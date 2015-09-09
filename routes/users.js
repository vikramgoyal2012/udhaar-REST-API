/**
 * Created with JetBrains PhpStorm.
 * User: vikram.go
 * Date: 9/9/15
 * Time: 12:19 PM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express'),
    router = express.Router();


router.get('/', function(req,res) {
    res.send("You successfully reached the users route");
})

module.exports = router;
