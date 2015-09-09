var express = require('express'),
    app = express(),
    config = require('./config/config');


app.use('/',require('./routes'));
app.listen(config.PORT);
