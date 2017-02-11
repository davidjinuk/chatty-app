import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
      super(props);
      this.messageChange = this.messageChange.bind(this);
      this.userChange = this.userChange.bind(this);
  }

  messageChange(event) {
    if (event.keyCode === 13) {
      this.props.newPing({
        content: event.target.value,
        username: this.props.currentUser.name
      });
    }
  }

  userChange(event) {
    if (event.keyCode === 13) {
      this.props.newUsername(event.target.value);
    }
  }

  render() {
    return (
      <div>
        <footer className='chatbar'>
          <input className='chatbar-username' placeholder='Your name here' onKeyUp={this.userChange} />
          <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyUp={this.messageChange} />
        </footer>
      </div>
    );
  }
}
export default ChatBar;