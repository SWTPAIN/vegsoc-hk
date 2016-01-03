var keystone = require('keystone');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'about';
	locals.page.title = 'About VegsocHK';

	locals.organisers = [
		{ name: 'Joan Chan', image: '/images/organiser-craig_sharkie.jpg', twitter: 'twalve', title: 'Founder, MC, coordinator' },
		{ name: 'Yip Fai Tse', image: '/images/organiser-gil_davidson.jpg', twitter: 'iamnotyourbroom', title: 'Atlassian coordinator' },
		{ name: 'Doris Lee', image: '/images/organiser-adam_ahmed.jpg', twitter: 'hitsthings', title: 'Atlassian coordinator' },
		{ name: 'Flora Yeung', image: '/images/organiser-adam_ahmed.jpg', twitter: 'hitsthings', title: 'Atlassian coordinator' },
		{ name: 'KaFai Choi', image: '/images/organiser-lachlan_hardy.jpg', twitter: 'lachlanhardy', title: 'Community coordinator' },
	];

	view.render('site/about');
};
