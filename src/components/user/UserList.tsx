import styled from 'styled-components';

const ListItem = styled.li`
  margin-top: 2px;
  padding: 10px;
  display: flex;
  width: 100%;
`;
const Icon = styled.a`
  width: calc(100% / 12);
`;
const IconImg = styled.img`
  width: 100%;
  border: 1px solid pink;
  border-radius: 20px;
`;
const TextArea = styled.div`
  margin-left: 20px;
  width: calc(100% - (100% / 12));
`;
const LinkText = styled.a`
`;
const Text = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

const UserList = ({data}) => {
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
}

export default UserList
