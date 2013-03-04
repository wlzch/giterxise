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
  app.use(app.router);
});


app.get('/', controller.index);

app.listen(port);
