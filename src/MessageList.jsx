import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div>
        <main className="messages">
          {this.props.messages.map(messageData =>
            <Message username={messageData.username} content={messageData.content} key={messageData.id} />
          )}
        </main>
      </div>
    );
  }
}
export default MessageList;