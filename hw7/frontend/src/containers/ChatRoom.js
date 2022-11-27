import styled from 'styled-components';
import Title from '../components/Title.js'
import Message from '../components/Message.js'
import ChatModal from "../components/ChatModal.js"
import { Input, Tabs, Button, message} from 'antd'
import { useState, useEffect, useRef } from 'react'
import {ChatProvider, useChat} from './hooks/useChat.js';



const ChatRoom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const ChatBoxWrapper = styled.div`
  height: calc(240px -36px);
  display:flex;
  flex-direction:column;
  overflow: auto;
`;

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const Chatroom=() => {
  const {messages, sendMessage, clearMessages } = useChat()
  const [chatBoxes, setChatBoxes] = useState([]); //{label, children, key}
  const [body, setBody] = useState('') // textBody
  const [activeKey, setActiveKey] = useState('')
  const [msgSent, setMsgSent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const bodyRef = useRef(null)
  const { me, setMe, setSignedIn, displayStatus } = useChat();
  
  const renderChat = (chat) => (
    chat.length === 0 ? (<p style={{ color: '#ccc' }}> No messages... </p>) : 
    (<ChatBoxWrapper>{
      chat.map
      (({name, body}, i) =>
      (<Message isMe={name===me} message={body} key={i}/>))}
      </ChatBoxWrapper>))
      // 產生 chat 的 DOM nodes
  
  const extractChat = (friend) => {
      return renderChat(messages.filter(({name, body}) => ((name === friend) || (name === me))));
  };

  const createChatBox = (friend) => {
    if (chatBoxes.some
       (({key}) => key === friend)) {
         throw new Error(friend + "'s chat box has already opened.");}

    const chat = extractChat(friend);
      setChatBoxes([...chatBoxes,{ label: friend, children: chat,key: friend }]);
      setMsgSent(true);
        return friend;
  };

  const removeChatBox =(targetKey, activeKey) => {
    const index = chatBoxes.findIndex(({key}) => key === activeKey);
    const newChatBoxes = chatBoxes.filter(({key}) =>key !== targetKey);
    setChatBoxes(newChatBoxes);
    return activeKey
      ? activeKey === targetKey
      ?index === 0
      ?'' 
      : chatBoxes[index - 1].key:activeKey
      : '';
    };
  
  return (
    <ChatRoom>
      <Title name = {me}/> 
      <ChatBoxesWrapper
        tabBarStyle={{height: '36px'}}
        type="editable-card"
        onChange={(key) => {
          setActiveKey(key);
          extractChat(key);
        }}
        onEdit={(targetKey, action) => {
        if (action === 'add') setModalOpen(true);
        else if (action === 'remove') {
          setActiveKey(removeChatBox(targetKey, activeKey));
        }
        }}
        items = {chatBoxes}
        />
      
      <ChatModal
      open={modalOpen}
      onCreate={({ name }) => {
      setActiveKey(createChatBox(name));
      extractChat(name);
      setModalOpen(false);
      }}
      onCancel={() => { setModalOpen(false);}}
      />
    
      <Input.Search
        ref={bodyRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
          return
          }
        sendMessage({ name: me, body: msg })
        setBody('')
        }}
      ></Input.Search>

    </ChatRoom>
  )
}

export default Chatroom;
