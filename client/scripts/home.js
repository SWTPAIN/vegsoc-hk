import React from 'react';

import HomeCarouselApp from '../components/HomeCarouselApp';
const homeCarouselAppTarget = document.getElementById('react-home-carousel');
if (homeCarouselAppTarget) {
	React.render(<HomeCarouselApp />, homeCarouselAppTarget);
}
