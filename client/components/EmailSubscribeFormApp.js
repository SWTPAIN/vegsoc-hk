import React, { Component } from 'react';
import ApiClient from '../helpers/ApiClient';

const apiClient = new ApiClient();

export default class EmailSubscribeFormApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      isSubsribed: false,
    };
  }

  render() {
    const { isSubsribed, email, name } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit.bind(this)}>
        <span className="input-wrapper">
          <input
            value={email}
            onChange={this.handleEmailValueChange.bind(this)}
            onFocus={this.handleEmailFocus.bind(this)}
            className="balloon"
            type="email"
            placeholder="Email(Required)"
            required/>
          <label htmlFor="name">Email</label>
        </span>
        <span className="input-wrapper">
          <input
            value={name}
            onChange={this.handleNameValueChange.bind(this)}
            className="balloon"
            type="text"
            placeholder="Name"/>
          <label htmlFor="name">Name</label>
        </span>
        <button className={`subscribe-button ${isSubsribed && 'highlighted'}`} type="submit">
          {
            isSubsribed
            ? <i className="fa fa-hand-peace-o"> Thank you</i>
            : <i className="fa fa-arrow-circle-right"> Subscribe</i>
          }
        </button>
      </form>
    );
  }

  handleEmailValueChange(e) {
    e.preventDefault();
    this.setState({email: e.target.value});
  }

  handleEmailFocus(e) {
    this.setState({isSubsribed: false});
  }

  handleNameValueChange(e) {
    e.preventDefault();
    this.setState({name: e.target.value});
  }

  handleFormSubmit(e) {
    e.preventDefault();
    apiClient
      .post({
        path: '/api/subscribers',
        options: {
          data: {
            email: this.state.email,
            name: this.state.name,
          },
        },
      })
      .then(result => {
        console.log(result);
        this.handleSubscribeSuccss();
      }, err => {
        console.log('Error: get featureSlides: ', err);
        this.handleSubscribeSuccss();
      })
      .catch(err => {
        console.log('Error: get featureSlides: ', err);
        this.handleSubscribeSuccss();
      });
  }

  handleSubscribeSuccss() {
    this.setState({
      email: '',
      name: '',
      isSubsribed: true,
    });
  }
}
