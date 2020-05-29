import React, { Component } from 'react';
import axios from 'axios';


class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      message: '',
      subject:'',
      email: '',
      sent: false,
      error: null,
      buttonText: 'Send Message'
    }
  }
  render() {
    return (
      <div className="App">
        <div>
          <form onSubmit={(e) => this.formSubmit(e)}>

            <label htmlFor="Your name">Your name</label>
            <input onChange={e => this.setState({ name: e.target.value })} name="Your name" id="fname" type="text" placeholder="Your Name" value={this.state.name} required/>

            <label htmlFor="email">Email</label>
            <input onChange={(e) => this.setState({ email: e.target.value })} name="email" id="email" type="email" placeholder="your@email.com" value={this.state.email} required/>

             <label htmlFor="subject">Subject</label>
            <input onChange={e => this.setState({ subject: e.target.value })} name="subject" id="subject" type="text" placeholder="Enter subject" value={this.state.subject} required/>

            <label htmlFor="message">Message</label>
            <textarea onChange={e => this.setState({ message: e.target.value })} name="message" id="message" type="text" placeholder="Please write your message here" value={this.state.message} required />

            <button type="submit">{this.state.buttonText}</button>

            <div className="notification">{this.state.sent} </div>
          </form>
        </div>
      </div>

    );
  }
  formSubmit = (e) => {
    e.preventDefault()

    this.setState({
      buttonText: '...sending'
    })

    const data = {
      name: this.state.name,
      subject:this.state.subject,
      email: this.state.email,
      message: this.state.message
    }
    
    axios.post('https://mailer-api2.herokuapp.com/email', data)
    // change the url to point to your own mailing service
      .then(res => {
        this.setState({ sent: res.data.message }, this.resetForm());
      })
      .catch((error, noerror) => {
        // this.setState({ sent: 'Sorry, this is our fault please try again later', buttonText: 'Not sent' });
        this.setState({ sent: error.response.data.error, buttonText: 'Not sent' })
      })
  }
  resetForm = () => {
    this.setState({
      name: '',
      message: '',
      subject:'',
      email: '',
      buttonText: 'Sent'
    })
  }
}

export default Contact;
