'use strict';
var auth = require('../services/auth.js');

module.exports = function (router) {
  router.get('/', function (req, res) {
    res.render('index');
  });
}
