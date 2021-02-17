var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var validator = require('express-validator');


var methodOverride = require('method-override');
var session = require('express-session');


var log = require(path.join(__dirname, 'middlewares', 'log.js'));




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartRouter = require('./routes/cart');
var apiRouter = require('./routes/api/api');
var apiSalesRouter = require('./routes/api/salesApi');




var app = express();

// view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');


//Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..', 'public')));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'FilesOnDemand',
  resave: true,
  saveUninitialized: true
}));



//Middlewares propios
app.use(log);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/api', apiRouter);
app.use('/api', apiSalesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
