// Dependencies
var express = require('express')
	, routes = require('./routes')
	, stylus = require('stylus')
	, stylusCompile
	, db = require('./models/db')
	, app;

app = module.exports = express.createServer();

stylusCompile = function(str, path) {
	return stylus(str)
		//.import(__dirname + '/css/mixins/blueprint')
		.set('filename', path)
		.set('warn', true)
		.set('linenos', true);
}

// Configuration
app.configure(function(){
	app.use(express.logger({
		format: ':date :method :url :status :response-time'
	}));	
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(stylus.middleware({
		linenos: true,
		compress: true,
		src: __dirname + '/public',
		compile: stylusCompile
	}));
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
	app.use(express.errorHandler({
		dumpExceptions: true, 
		showStack: true
	})); 
});

app.configure('production', function(){
	app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);
app.get('/projects', routes.projects);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
