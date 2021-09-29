import React from 'react'

interface Props {
  message: string;
}

const ChatItem = ({ message }: Props) => {
  return (
    <div data-testid="todo">
      <p data-testid="todoInput">{message}</p>
    </div>
  );
};

export default ChatItem
