import { useState, useEffect, useRef } from "react";
import { Tabs, Input } from "antd";
import styled from "styled-components";
import { useChat } from "./hooks/useChat";
import Title from "../components/Title";
import Message from "../components/Message";
import ChatModal from "../components/ChatModal";

const ChatBoxesWrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
`;

const ChatBoxWrapper = styled.div`
height: calc(240px - 36px);
display: flex;
flex-direction: column;
overflow: auto;
`;

const FootRef = styled.div`
  height: 20px;
`;

const ChatRoom = () => {
  const { me, messages, startChat, displayStatus } = useChat();
  const [chatBoxes, setChatBoxes] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  // const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");
  const [msgSent, setMsgSent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // const msgRef = useRef(null);
  const msgFooterRef = useRef(null);

  const renderChat = () => (
    messages.length === 0 ? (
      <p style={{ color: "#ccc" }}>No messages...1</p>
    ) : (
      <ChatBoxWrapper>{
        messages.map
        (({ sender, body }, i) =>
        (<Message isMe={sender === me} key={i} body={body} />))}
        <FootRef ref={msgFooterRef} />
      </ChatBoxWrapper>))
  // const displayMessages = () => {
  //   return (
  //     messages.length === 0 ? (
  //       <p style={{ color: "#ccc" }}>No messages...</p>
  //     ) : (
  //       messages.map(({ name, body }, i) => (
  //         <Message key={i} name={name} body={body} isMe={name===me}/>
  //       )))
  //   )
  // };

  // const extractChat = (friend) => {
  //   return renderChat(messages);
  // };

  const createChatBox = (friend) => {
    if (chatBoxes.some(({key}) => key === friend)) {
      throw new Error(friend + "'s chat box already exists!");
    }
    const chat = renderChat(friend);
    setChatBoxes([...chatBoxes,
      {label: friend, children: chat, key: friend}]);
    setMsgSent(true);
    return friend;
  };

  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.findIndex(({key}) => key === activeKey);
    const newChatBox = chatBoxes.filter(({key}) => key !== targetKey);
    setChatBoxes(newChatBox);

    return activeKey
      ? activeKey === targetKey
        ? index === 0
          ? '' : newChatBox[index - 1].key
        : activeKey
      : '';
  };

  const scrollToBottom = () => {
    msgFooterRef.current?.scrollIntoView(
      { behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    scrollToBottom();
    console.log("scrolling to bottom");
    setMsgSent(false);
  }, [msgSent]);

  useEffect(() => {
    if (activeKey){
      startChat(me, activeKey);
    }
  }, [activeKey]);

  useEffect(() => {
    if (activeKey){
      // update chat box
      let newChatBoxes = [];
      chatBoxes.forEach((chatBox, i) => {
        if (chatBox.key === activeKey) {
          newChatBoxes.push({
            label: activeKey,
            children: renderChat(activeKey),
            key: activeKey
          });
        } else {
          newChatBoxes.push(chatBox);
        }
      });
      setChatBoxes(newChatBoxes);
      console.log("chatBoxes updated");
      setMsgSent(true);
    }
  }, [messages]);

  return (<>
    <Title name={me}/>
    <>
      <ChatBoxesWrapper
        tabBarStyle={{ height: "36px" }}
        type="editable-card"
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key);
        }}
        onEdit={(targetKey, action) => {
          if (action === "add") setModalOpen(true);
          else if (action === "remove") {
            setActiveKey(removeChatBox(targetKey, activeKey));
          }
        }}
        items={chatBoxes}
      />
      <ChatModal
        open={modalOpen}
        onCreate={({ name }) => {
          setActiveKey(createChatBox(name));
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      />
    </>
    <Input.Search
      value={msg}
      onChange={e => setMsg(e.target.value)}
      enterButton="Send"
      placeholder="Type a message here..."
      onSearch={(msg) => {
        if (!msg) {
          displayStatus({
            type: 'error',
            msg: 'Please enter message' })
          return
        } else if (activeKey === "") {
          displayStatus({
            type: 'error',
            msg: 'Please add a chat box first' })
          setMsg('')
          return;
        }
        
        setMsg('')
        setMsgSent(true)
      }}
    ></Input.Search>
  </>
  );};

export default ChatRoom;