import React from 'react'

const ChatItem = ({ data }) => {
  return <div>{data.data().message}</div>;
};

export default ChatItem
