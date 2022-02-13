import { ChatItemType } from '../../declarations/Chat';

const ChatItem: React.FC<ChatItemType> = ({ message }) => {
  return (
    <div data-testid="todo">
      <p data-testid="todoInput">{message}</p>
    </div>
  );
};

export default ChatItem;
