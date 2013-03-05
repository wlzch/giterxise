var
  express = require('express'),
  flash = require('connect-flash'),
  app = express(),
  controller = require('./controller')
;
var port = process.env.PORT || 80;

if ('development' == app.get('env')) {
  app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
  }));
}
if ('production' == app.get('env')) {
  app.use(express.errorHandler());
}


app.set('views', __dirname+'/views');
app.set('view engine', 'jade');
app.configure(function() {
  app.use(express.logger());
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname+'/public'));
  app.use(express.cookieParser('secret'));
  app.use(express.session({
    key: 'sid',
    cookie: {
      maxAge: 60000
    }
  }));
  app.use(flash());
  app.use(function(req, res, next) {
    req.isAuthenticated = function() {
      return req.session.authenticated === true;
    }
    next();
  });
  app.use(app.router);
});

var requiresAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
}


app.get('/', controller.index);
app.get('/login', controller.login);
app.post('/login', controller.loginCheck);
app.get('/admin', requiresAuth, controller.admin);
app.post('/admin', requiresAuth, controller.adminCheck);

app.listen(port);
