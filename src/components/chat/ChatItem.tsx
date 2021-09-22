import React from 'react'

const ChatItem = ({ data }:any) => {
  return <div>{data.data().message}</div>;
};

export default ChatItem
