import React, { Component } from 'react';
import ApiClient from '../helpers/ApiClient';
import _ from 'underscore';
import { Carousel } from 'react-responsive-carousel';

const apiClient = new ApiClient();

export default class HomeCarouselApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
    apiClient
      .get({
        path: '/api/featureSlides',
      })
      .then(result => {
        console.log(result);
        this.setState({
          posts: result.posts,
        });
      }, err => {
        console.log('Error: get posts: ', err);
      })
      .catch(err => {
        console.log('Error: get posts: ', err);
      });
  }

  render() {
    return (
      <Carousel
        type="slider"
        showArrows
        showStatus={false}
        showThumbs={false}>
        {
          _.map(this.state.posts, post => (
            <div key={post._id}>
              <img src={(post.image && post.image.secure_url) || 'https://veganrush.files.wordpress.com/2013/11/vegan-model-strips-down-for-activism.jpg'} />
              <h1 className="legend">{post.title}</h1>
              <p className="legend">{post.content.brief}</p>
            </div>
          ))
        }
      </Carousel>
    );
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
