import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <main className='messages'>
        {this.props.messages.map(messageData =>
          <Message message={messageData} key={messageData.id}/>
        )}
      </main>
    );
  }
}
export default MessageList;