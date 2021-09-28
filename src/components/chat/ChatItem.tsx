import React from 'react'

const ChatItem = ({ data }:any) => {
  return (
    <div data-testid="todo">
      <p data-testid="todoInput">{data.data().message}</p>
    </div>
  );
};

export default ChatItem
