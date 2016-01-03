import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

export default class HomeCarouselApp extends Component {
  render() {
    return (
      <Carousel type="slider" showControls={true} showStatus={true}>
        <img src="http://leandrowd.github.io/react-responsive-carousel/assets/1.jpeg" />
        <img src="http://leandrowd.github.io/react-responsive-carousel/assets/5.jpeg" />
      </Carousel>
    )
  }
}
