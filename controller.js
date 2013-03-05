var
  yaml = require('js-yaml'),
  _ = require('underscore'),
  controller = {}
;

controller.index = function(req, res) {
  var config = require('./config.yml');
  var exercises = {};
  _.each(config.exercises, function(exercise) {
    res.render('exercises/exercise'+exercise, function(err, html) {
      exercises['tab'+exercise] = html;
    });
  });
  res.render('index', {
    exerciseNumbers: config.exercises,
    exercises: exercises
  });
};

module.exports = controller;
