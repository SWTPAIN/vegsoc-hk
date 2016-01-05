var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'animal-rights';
	locals.page.title = 'Animal Rights';

	view.render('site/animalRights');

}
