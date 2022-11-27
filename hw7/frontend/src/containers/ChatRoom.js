import styled from 'styled-components';
import Title from '../components/Title.js'
import Message from '../components/Message.js'
import ChatModal from "../components/ChatModal.js"
import { Input, Tag, Button, message } from 'antd'
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

const ChatBoxesWrapper = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

function App() {
  const { status, messages, sendMessage, clearMessages } = useChat()
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('') // textBody
  const bodyRef = useRef(null)
  const { me, setMe, setSignedIn, displayStatus } = useChat();

  return (
    <ChatRoom>
      <Title name = {me}> 
      </Title>
      
      <ChatBoxesWrapper>
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
          messages.map(({ name, body }, i) => (
            <p key={i}>
              <Tag color="blue">{name}</Tag> {body}
            </p>
          ))
        )}
      </ChatBoxesWrapper>

      <Input
        placeholder={me}
        value={me}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            bodyRef.current.focus()
        }}}
      ></Input>
      
      <Input.Search
        ref={bodyRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
          return
          }
        sendMessage({ name: username, body: msg })
        setBody('')
        }}
      ></Input.Search>

    </ChatRoom>
  )
}

export default App
