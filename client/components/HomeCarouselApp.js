import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

export default class HomeCarouselApp extends Component {
  render() {
    return (
      <Carousel
        type="slider"
        showArrows
        showStatus={false}
        showThumbs={false}>
        <div>
          <img src="https://veganrush.files.wordpress.com/2013/11/vegan-model-strips-down-for-activism.jpg" />
          <p className="legend">Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan</p>
        </div>
        <div>
          <img src="//c2.staticflickr.com/4/3665/12944904715_81fc31a117_h.jpg" />
          <p className="legend">Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan</p>
        </div>
        <div>
          <img src="http://350.org/wp-content/uploads/2014/12/15126725147_736cd6dedd_k.jpg" />
          <p className="legend">Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan</p>
        </div>
      </Carousel>
    );
  }
}
