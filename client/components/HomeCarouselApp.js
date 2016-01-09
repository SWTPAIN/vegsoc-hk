import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

export default class HomeCarouselApp extends Component {
  render() {
    return (
      <Carousel type="slider" showControls showStatus>
        <img src="//c2.staticflickr.com/4/3665/12944904715_81fc31a117_h.jpg" />
        <img src="//c2.staticflickr.com/4/3910/14370568981_2d49ecf1b7_n.jpg" />
        <img src="//c1.staticflickr.com/1/56/130747772_537669005a_n.jpg" />
      </Carousel>
    );
  }
}
