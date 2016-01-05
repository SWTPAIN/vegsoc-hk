var keystone = require('keystone'),
	_ = require('underscore');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'download-center';
	locals.page.title = 'VegsocHK Download Center';

	view.render('site/downloadCenter');

}
