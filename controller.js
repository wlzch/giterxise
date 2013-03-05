var
  yaml = require('yamljs'),
  _ = require('underscore'),
  hash = require('node_hash'),
  fs = require('fs'),
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

controller.login = function(req, res) {
  res.render('login');
};

controller.loginCheck = function(req, res) {
  if (hash.sha1(req.body.code) == 'b67415c60f7b9e5f938b5598f892916030aecb57') {
    req.session.authenticated = true;
    res.redirect('/admin');
  } else {
    res.render('login');
  }
};

controller.admin = function(req, res) {
  var config = require('./config.yml');
  var openExercises = [];
  _.each(config.exercises, function(exercise) {
    openExercises.push(parseInt(exercise));
  });
  res.render('admin', {
    exercises: _.range(1, config.number_of_exercises + 1),
    openExercises: openExercises
  });
};

controller.adminCheck = function(req, res) {
  var exercises = req.body.exercises;
  var config = require('./config.yml');
  config.exercises = exercises;
  fs.writeFile('./config.yml', yaml.stringify(config, 4), function(err) {
    res.redirect('/admin');
  });
};

module.exports = controller;
