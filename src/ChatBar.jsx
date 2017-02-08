import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
      super(props);
      this.messageChange = this.messageChange.bind(this);
  }

  messageChange(event) {
      if (event.keyCode === 13) {
        this.props.newPing(event.target.value);
      }
  }

  render() {
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder={this.props.currentUser.name} />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.messageChange} />
        </footer>
      </div>
    );
  }
}
export default ChatBar;