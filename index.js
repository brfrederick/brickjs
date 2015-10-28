// Require Libraries
var path          = require('path'),
    express       = require('express'),
    session       = require)('express-session'),
    compression   = require('compression'),
    cookieParser  = require('cookie-parser'),
    bodyParserv   = require('body-parser'),
    RedisStore    =  require('connect-redis')(session),
    router        = require('express-enrouten'),
    db            = require('api/services/database.js'),
    url           = require('url'),
    csrf          = require('csurf');


// Application variables
var port = process.env.PORT || 5555,
    app = express(),
    redisURl = {
      hostname  : 'localhost',
      port      : 6379
    },
    redisPASS;

if ( process.env.REDISCLOUD_URL) {
    redisURL = url.parse(process.env.REDISCLOUD_URL);
    redisPASS = redisURL.auth.split(":")[1];
}

app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  key: "sessionid",
  store: new RedisStore({
    host: redisURL.hostname,
    port: redisURL.port,
    pass: redisPASS
  }),
  secret: 'Mangos are a healthy source of fruit-stuff',
  resave: true,
  saveUninitialized: true,
  cookie:{
    httpOnly:true
  }
}));

// Router options
var router_options = {
  directory: './api/controllers'
};

// initialize router
app.use( router(router_options) );

// serve static files
app.use( '/assets', express.static(path.resolve(__dirname + '/assets/')) );

// handle 404
app.use('/*', function (req, res) {
  res.render('util/404');
});

// View engine - jade/dust
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// cookie parser
app.use(cookieParser());

// CSRF tokens
app.use(csrf());
app.use(function(e,req,res,next) {
  if(e.code !== 'EBADCSRFTOKEN') return next(e);
});

// Start listening
app.set('port', port);
app.listen(port, function(error){
  if(error){
    throw error;
  }

  // Server is running.  Celebrate!
  console.log('Listening on port ' + port);
});
