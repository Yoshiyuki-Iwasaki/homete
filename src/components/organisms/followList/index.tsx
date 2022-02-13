import { ListItem, Icon, IconImg, TextArea, LinkText, Text } from './style';

const UserList: React.FC<any> = ({ data }) => {
  return data
    ? data.docs.map((doc, index) => (
        <ListItem key={index}>
          <Icon href={`/user/${doc.data().uid}`}>
            <IconImg src={doc.data().photoURL} alt="" />
          </Icon>
          <TextArea>
            <LinkText href={`/user/${doc.data().uid}`}>
              <Text>{doc.data().displayName}</Text>
            </LinkText>
          </TextArea>
        </ListItem>
      ))
    : '';
};

export default UserList;
