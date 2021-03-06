var errorHandler = require('strong-error-handler');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res, next) => {
    res.status(404);
    next(new Error('File not found'));
})

app.use(errorHandler({
    debug: app.get('env') === 'development',
    log: true,
    defaultType: "html",
    negotiateContentType: false
}));

module.exports = app;
