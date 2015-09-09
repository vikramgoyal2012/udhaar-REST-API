var express = require('express'),
    app = express();

app.get('/',function(req,res) {
    res.send("Hello world");
})

app.get('/test', function (req,res) {
    res.send("Test");
})

app.listen('3000');