var keystone = require('keystone');
var Post = keystone.list('Post');

exports = module.exports = function(req, res) {
	const rtn = {
		posts: [],
	};

	var q = Post.model.find().where('state', 'published').sort('-publishedDate').populate('author categories');

	q.exec((err, results) => {
		if (err) {
			rtn.err = err;
		}
		rtn.posts = results;
		res.json(rtn);
	});
};
