import { ChatItemType } from '../../declarations/Chat';

const ChatItem = ({ message }: ChatItemType) => {
  return (
    <div data-testid="todo">
      <p data-testid="todoInput">{message}</p>
    </div>
  );
};

export default ChatItem;
