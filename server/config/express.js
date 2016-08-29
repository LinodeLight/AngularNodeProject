'use strict';
var bodyParser 		    = require('body-parser'),
    cookieParser 	    = require('cookie-parser'),
    express 		    = require('express'),
    logger 			    = require('morgan'),
    passport 		    = require('passport'),
    session 		    = require('express-session'),
    MongoStore          = require('connect-mongo')(session),
    stylus 			    = require('stylus'),
    mongoose 		    = require('mongoose'),
    userModel 		    = require('../models/Users');

module.exports = function(app, config) {
	// function for use by stylus middleware
	function compile(str, path) {
		return stylus(str).set('filename', path);
	}
	// set up view engine
	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');

	app.use(logger('dev'));

    // authentication cofigs
	app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb'
    }));
    app.use(bodyParser.json({limit: '50mb'}));

    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {});
    userModel.createDefaultUsers();
    
    //Connection session
    app.use(session({
        secret: 'topsecret',
        store: new MongoStore({
            mongooseConnection: db,
            autoRemove: 'native',
            touchAfter: 120}),
        touchAfter: 120,
        resave: true,
        saveUninitialized: true
    }));

	app.use(passport.initialize());
	app.use(passport.session());

	// stylus middleware implementation - routes to anything in public directory
	app.use(stylus.middleware(
	{
		src: config.rootPath + '/public',
		compile: compile
    }
    ));
    app.use(express.static(config.rootPath + '/public'));
}