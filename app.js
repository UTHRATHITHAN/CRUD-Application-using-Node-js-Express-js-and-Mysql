var createError = require('http-errors');
var express = require('express');
var app = express();


var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session =require('express-session');
var flash = require('connect-flash');
const bodyParser = require('body-parser')
const { check , validationResult } = require('express-validator')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const urlencodedParser = bodyParser.urlencoded({ extended : false})

app.use(session({
  secret : 'auth',
  cookie: {maxAge : 60000},
  saveUninitialized : false,
  resave : false
}
));

app.post('/',urlencodedParser, [
  check('Employee_Name', 'This Employee_Name must me 3+ characters long')
   .exists()
   .isLength({ min: 3 }),
check('Employee_Id','This Employee_Id must me 3+ characters long')
  .exists()
  .isLength({ min: 4 }),
check('Salary','This Salary must me 5+ characters long')
  .exists()
  .isLength({ min: 5 }),
check('address','This address must me 20+ characters long')
  .exists()
  .isLength({ min: 20 }),

],(req, res)=>{
	
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    
      const alert = errors.array()
      res.render(' index', {
          alert
      })
  }
  })
  

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
