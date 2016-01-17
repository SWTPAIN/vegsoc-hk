var keystone = require('keystone');
const Types = keystone.Field.Types;

const FeatureSlide = new keystone.List('FeatureSlide', {
	map: { name: 'label' },
	track: true,
	autokey: { path: 'slug', from: 'label', unique: true },
});

FeatureSlide.add({
	label: { type: String, required: true, initial: true },
	href: { type: Types.Url },
  image: { type: Types.CloudinaryImage, required: true, initial: false },
	description: { type: Types.Html, wysiwyg: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	post: { type: Types.Relationship, ref: 'Post', many: false },
	publishedDate: { type: Types.Date, index: true },
});

FeatureSlide.defaultColumns = 'label, href, post|20%, state|20%';
FeatureSlide.register();
