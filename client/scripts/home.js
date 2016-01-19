import React from 'react';
import ReactRom from 'react-dom';

import HomeCarouselApp from '../components/HomeCarouselApp';
import EmailSubscribeFormApp from '../components/EmailSubscribeFormApp';

const homeCarouselAppTarget = document.getElementById('react-home-carousel');
if (homeCarouselAppTarget) {
	ReactRom.render(<HomeCarouselApp />, homeCarouselAppTarget);
}

const emailSubscribeFormTarget = document.getElementById('react-email-subscribe-form');
if (emailSubscribeFormTarget) {
	ReactRom.render(<EmailSubscribeFormApp />, emailSubscribeFormTarget);
}
