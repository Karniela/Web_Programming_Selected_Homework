import { Tag } from 'antd';
import styled from 'styled-components';

const StyledMessage = styled.div`
display: flex;
align-items: center;
flex-direction: ${({isMe}) => (isMe ? 'row-reverse' : 'row')};

  & p:first-child {
    margin: 0px;
  }

  & p:last-child {
    padding: 2px 5px;
    border-radius: 5px;
    background: #eee;
    color: gray;
    margin: auto 0;
  }
`;

const Message = ({ isMe, body}) => {
  return (
    <StyledMessage isMe={isMe}>
      <p>{body}</p>
    </StyledMessage>
  );
};

export default Message;
