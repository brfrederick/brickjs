// Require Libraries
var path    = require('path'),
    express = require('express'),
    router  = require('express-enrouten');

// Application variables
var port = process.env.PORT || 5555,
    app = express();

// Router options
var router_options = {
  directory: './api/controllers'
};

// setup database connection


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

// Start listening
app.set('port', port);
app.listen(port, function(error){
  if(error){
    throw error;
  }

  // Server is running.  Celebrate!
  console.log('Listening on port ' + port);
});
