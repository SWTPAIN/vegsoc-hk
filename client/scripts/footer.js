import React from 'react';
import ReactRom from 'react-dom';

import EmailSubscribeFormApp from '../components/EmailSubscribeFormApp';

const emailSubscribeFormTarget = document.getElementById('react-email-subscribe-form');
if (emailSubscribeFormTarget) {
	ReactRom.render(<EmailSubscribeFormApp />, emailSubscribeFormTarget);
}
