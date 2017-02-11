import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Guest'},
      messages: [],
      userCount: 0
    };
    this.newPing = this.newPing.bind(this);
    this.newUsername = this.newUsername.bind(this);
  }

  newUsername(newUser) {
    let currentUser = this.state.currentUser.name;
    this.setState({
      currentUser: {name: newUser}
    });
    const userNow = {
      type: 'postNotification',
      content: currentUser + ' has changed their name to ' + newUser
    };
    const jsonUserNow = JSON.stringify(userNow);
    this.socket.send(jsonUserNow);
  }

  newPing(newPing) {
    const newMessage = {
      username: this.state.currentUser.name,
      content: newPing.content,
      type: 'postMessage'
    };
    const jsonNewMessage = JSON.stringify(newMessage);
    this.socket.send(jsonNewMessage);
  }

  componentDidMount() {
    const ws = new WebSocket('ws://localhost:4000');
    this.socket = ws;
    this.socket.onopen = event => {
      console.log('Connected to the websocket server');
    };

    this.socket.onmessage = event => {
      const data = JSON.parse(event.data);
      switch(data.type) {
        case 'incomingMessage':
          const messages = this.state.messages.concat(data);
          this.setState({messages: messages});
          break;
        case 'incomingNotification':
          const newUser = this.state.messages.concat(data);
          this.setState({messages: newUser});
          break;
        case 'users':
          this.setState({userCount: data.userCount});
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    };
  }

  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href="/" className='navbar-brand'>Chatty</a>
          <span className='userCount'>Users online: {this.state.userCount}</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} newPing={this.newPing} newUsername={this.newUsername} />
      </div>
    );
  }
}
export default App;