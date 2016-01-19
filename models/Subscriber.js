const keystone = require('keystone');
const Types = keystone.Field.Types;

var Subscriber = new keystone.List('Subscriber', {
	track: true,
	autokey: { path: 'key', from: 'email', unique: true },
});

Subscriber.add({
	name: { type: String },
	email: { type: Types.Email, initial: true, index: true },
});

Subscriber.defaultColumns = 'email';
Subscriber.register();
