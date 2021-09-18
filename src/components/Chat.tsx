import React from 'react'
import ChatList from './ChatList';
import ChatInput from './ChatInput';

const Chat = ({ todo }) => {
  return (
    <div>
      <ChatList todo={todo} />
      <ChatInput todo={todo} />
    </div>
  );
};

export default Chat
