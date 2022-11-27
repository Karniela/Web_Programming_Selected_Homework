import Title from '../Components/Title'
import Message from '../Components/Message'
import MessageWrapper from '../Components/MessageWrapper'
import ChatModal from "../Components/ChatModal"
import { Input, Tabs, Button } from 'antd'
import { useState, useEffect, useRef } from 'react'
import { useStatus } from "../Hooks/useStatus"
import useChat from '../Hooks/useChat';
import client from "../connection";

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

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s;
      const content = {
        content: msg, duration: 0.5 }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }}}
  
  useEffect(() => {
    displayStatus(status)}, [status])
  

  return (
    <ChatRoom>
      <Title name:me>

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
        placeholder="Username"
        value={username}
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
