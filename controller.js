var controller = {};
var yaml = require('js-yaml');

var config = require('./config.yml');

controller.index = function(req, res) {
  res.render('index', {
    succeeds: config.succeeds
  });
};

module.exports = controller;
