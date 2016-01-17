var keystone = require('keystone');
var FeatureSlide = keystone.list('FeatureSlide');

exports = module.exports = function(req, res) {
	const rtn = {
		featureSlides: [],
	};

	var q = FeatureSlide.model.find().where('state', 'published').sort('-publishedDate').populate('post');

	q.exec((err, results) => {
		if (err) {
			rtn.err = err;
		}
		rtn.featureSlides = results;
		res.json(rtn);
	});
};
