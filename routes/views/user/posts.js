var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'blog';
	locals.page.title = `${req.params.userId} - VegsocHK`;
	locals.filters = {
		userId: req.params.userId,
	};

	locals.data = {
		author: null,
		posts: [],
	};

	// Load the user
	view.on('init', function(next) {
		var q = keystone.list('User').model.findById(locals.filters.userId);

		q.exec(function(err, results) {
			locals.data.author = results;
			console.log('err', err);
			next(err);
		});
	});

	// Load the posts
	view.on('init', function(next) {
		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author categories');

		if (locals.data.userId) {
			q.where('id', locals.filters.userId);
		}

		q.exec(function(err, results) {
			locals.data.posts = results;
			console.log('err', err);
			next(err);
		});
	});

	// Render the view
	view.render('site/user/posts');
};
