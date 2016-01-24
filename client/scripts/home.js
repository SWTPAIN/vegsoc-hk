import React from 'react';
import ReactRom from 'react-dom';

import HomeCarouselApp from '../components/HomeCarouselApp';

const homeCarouselAppTarget = document.getElementById('react-home-carousel');
if (homeCarouselAppTarget) {
	ReactRom.render(<HomeCarouselApp />, homeCarouselAppTarget);
}
