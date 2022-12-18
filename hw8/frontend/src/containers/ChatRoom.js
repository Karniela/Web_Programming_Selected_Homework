import './App.css'
import { Button, Input, Tag, message, Tabs } from 'antd'
import {useState, useEffect, useRef} from 'react'
import {useChat} from './hooks/useChat'
import styled from "styled-components"
import Title from '../components/Title'
import Message from '../components/Message'
import ChatModal from '../components/ChatModal'


const ChatBoxesWrapper = styled(Tabs) `
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`;
const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display:flex;
    flex-direction: column;
    overflow:auto;
`
const Footer = styled.div`
    height: 20px;    
`;

const ChatRoom = () => {
  const {me, messages, sendMessage, displayStatus, startChat} = useChat();
  const [msg, setMsg] = useState(""); //text input body
  const [activeKey, setActiveKey] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const [chatboxes, setChatboxes] = useState([]); // {label, children, key}
  const [modalOpen, setModalOpen] = useState(false);
  const bodyRef = useRef(null);
  const msgFooter = useRef();
  const scrollToBottom = () => {
    msgFooter.current?.scrollIntoView({ behavior: 'smooth', block: 'start'})
  }

  const renderChat = () => {
    console.log("reder")
    //console.log(msgFooter.current);
    //console.log(messages);
    return (
        <ChatBoxWrapper>
            {
                messages.map(({sender, body}, i) => (
                    <Message isMe = {sender === me} message = {body} key = {i} />
                ))
            }
            <Footer ref = {msgFooter} />
        </ChatBoxWrapper>
    )
  }

  const createChatBox = (friend) => {
        if (chatboxes.some
        (({key}) => key === friend)) {
            throw new Error(friend + "'s chat box has already opened.");
            }
        setChatboxes([...chatboxes,
            { label: friend, children: null,
                key: friend }]);
        //setMsgSent(true);
        return friend;
  };

  const removeChatBox = (targetKey, activeKey) => {
    const index = chatboxes.findIndex (({key}) => key === activeKey);
    const newChatBoxes = chatboxes.filter(({key}) => key !== targetKey);
    setChatboxes(newChatBoxes);
    return(
        (newChatBoxes.length !== 0)?
            activeKey === targetKey?
                index === newChatBoxes.length?
                newChatBoxes[index-1].key : newChatBoxes[index].key
            : activeKey
        : ""
    )
  }

  useEffect(() => {
    //console.log(msgFooter);
    scrollToBottom();
    //console.log("scroll2");
    setMsgSent(false);
  }, [msgSent]);

  useEffect(() => {
    setChatboxes(chatboxes.map(box => {
        if(box.key !== activeKey) return {label: box.label, children: null, key: box.key};
        else return {label: box.label, children: renderChat(), key: box.key};
    }))
    setMsgSent(true);

  }, [messages])
  
  useEffect(() => {
    if(activeKey !== "")
        startChat(me, activeKey);
  }, [activeKey])


  return (
    <>
      <Title name = {me} />
      <>
        <ChatBoxesWrapper
            tabBarStyle={{height: '36px'}}
            type="editable-card"
            activeKey={activeKey}
            //click
            onChange={key => {
                //backend
                setActiveKey(key);
                //startChat(me, key);
            }}
            // +("add") x("remove")
            onEdit={(targetKey, action) => {
                if(action === "add") setModalOpen(true);
                else if(action === "remove") {
                    const key = removeChatBox(targetKey, activeKey)
                    setActiveKey(key)
                    //startChat(me, key);
                }
            }}
            items={chatboxes}
        />
        <ChatModal
            open={modalOpen}
            onCreate={({ name }) => {
                try{setActiveKey(createChatBox(name))}
                catch(e) {
                    displayStatus({type: "error", msg: name +"'s chat box has already opened."})
                    setActiveKey(name)    
                }
                //startChat(me, name);
                setModalOpen(false)
            }}
            onCancel={() => {
                setModalOpen(false);
            }}
        />
      </>
      <Input.Search
        ref={bodyRef}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a message body.'
            })
            return
          }
          else if (!activeKey){
            displayStatus({
                type: 'error',
                msg: 'Please open a chatbox. '
            })
          }
          sendMessage(me, activeKey, msg)
          setMsg('');
        }}        
      ></Input.Search>
    </>
  )
}

export default ChatRoom
