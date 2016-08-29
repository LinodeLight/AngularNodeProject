var auth 				= require('./auth'),
	users 				= require('../controllers/users'),
	cors 				= require('cors');

module.exports	= function(app) {
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
	app.get('/api/users/:id', auth.requiresRole('admin'), users.getUsersByID);
	app.post('/api/users', auth.requiresApiLogin, auth.requiresRole('admin'), users.createUser);
	app.put('/api/users', auth.requiresRole('admin'), users.updateUser);
	app.delete('/api/users/:id', auth.requiresRole('admin'), users.deleteUser);

	app.get('/partials/*', function(req, res) {
		res.render('../../public/app/' + req.params[0]);
	});

	app.post('/login', auth.authenticate);

	app.post('/logout', function(req, res) {
		req.logout();
		res.end();
	});

	app.all('/api/*', function(req, res) {
		res.sendStatus(404);
	});
	app.get('*', function(req, res) {
		res.render('index', {
			bootstrappedUser: req.user
		});
	});
};
