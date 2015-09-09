var express = require('express'),
    app = express();


app.use('/',require('./routes'));
app.listen('3000');

