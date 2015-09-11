var express = require('express'),
    app = express(),
    config = require('./config/config'),
    parser = require('body-parser');        //for parsing post and put requests

app.use(parser.json()); // support json encoded bodies
app.use(parser.urlencoded({ extended: true })); // support encoded bodies
app.use('/',require('./routes'));
app.listen(process.env.port || config.APPSERVER_PORT);
