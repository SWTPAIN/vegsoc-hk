var keystone = require('keystone');
var Subscriber = keystone.list('Subscriber');

exports = module.exports = function(req, res) {
  const subscriberData = {email: req.body.email, name: req.body.name};

  if (!req.body.email) return res.apiResponse({ success: false });

	const rtn = {
		subscriber: null,
	};

  const newSubscriber = new Subscriber.model(subscriberData);

  newSubscriber.save(function(err, result) {
    if (err) {
      console.log('[api.subscribers.create]  - Error saving new subscriber.', err);
      console.log('------------------------------------------------------------');
      rtn.err = err;
    }
    console.log('[api.app.signup]  - Saved new user.');
    console.log('------------------------------------------------------------');
    rtn.subscriber = result;
    res.json(rtn);
  });
};
