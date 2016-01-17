import React, { Component } from 'react';
import ApiClient from '../helpers/ApiClient';
import _ from 'lodash';
import { Carousel } from 'react-responsive-carousel';

const apiClient = new ApiClient();

export default class HomeCarouselApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      featureSlides: [],
    };
    apiClient
      .get({
        path: '/api/featureSlides',
      })
      .then(result => {
        console.log(result);
        this.setState({
          featureSlides: result.featureSlides,
        });
      }, err => {
        console.log('Error: get featureSlides: ', err);
      })
      .catch(err => {
        console.log('Error: get featureSlides: ', err);
      });
  }

  render() {
    return (
      <Carousel
        type="slider"
        onClickItem={this.handleSlideOnClick.bind(this)}
        showArrows
        showStatus={false}
        showThumbs={false}>
        {
          _.map(this.state.featureSlides, slide => (
            <div
              style={{cursor: 'pointer'}}
              key={slide._id}>
              <img src={(slide.image && slide.image.secure_url) || 'https://veganrush.files.wordpress.com/2013/11/vegan-model-strips-down-for-activism.jpg'} />
              <div
                dangerouslySetInnerHTML={{__html: slide.description}}
                className="legend"></div>
            </div>
          ))
        }
      </Carousel>
    );
  }

  handleSlideOnClick(slideIndex) {
    const slide = this.state.featureSlides[slideIndex];
    window.location = slide.href || '/article/post/' + slide.post.slug;
  }
}

// <div>
//   <img src="https://veganrush.files.wordpress.com/2013/11/vegan-model-strips-down-for-activism.jpg" />
//   <p className="legend">Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan</p>
// </div>
// <div>
//   <img src="//c2.staticflickr.com/4/3665/12944904715_81fc31a117_h.jpg" />
//   <p className="legend">Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan</p>
// </div>
// <div>
//   <img src="http://350.org/wp-content/uploads/2014/12/15126725147_736cd6dedd_k.jpg" />
//   <p className="legend">Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan Vegan</p>
// </div>
