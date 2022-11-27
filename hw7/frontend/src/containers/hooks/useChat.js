import { useState,createContext, useEffect, useContext} from "react";
import{message} from 'antd';
const client = new WebSocket ('ws://localhost:4000')
const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
  status: {},
  me: "",
  signedIn: false,
  messages: [],
  sendMessage: () => {},
  clearMessages: () => {},
});


const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false);
    const [me, setMe] = useState(savedMe || "");

    useEffect(() => {
      if (signedIn) {
        localStorage.setItem(LOCALSTORAGE_KEY, me);
      }
    }, [me, signedIn]);

    client.onmessage = (byteString) => {
      const { data } = byteString;
      const [task, payload] = JSON.parse(data);
      switch (task) {
        
        case "init": {
          console.log('Get data')
          setMessages(payload);
          break;
        }

        case "output": {
          setMessages(() =>
          [...messages, ...payload]); break; }
          default: break;

        case "cleared":{
          setMessages([]);
          break;
        }}
      }

    const sendData = async (data) => {
        client.send(JSON.stringify(data));
      };



    const sendMessage = (msg) => {
    sendData(['input', msg]);
    setStatus({type: "success",msg: "Message sent." });
    console.log(msg);
    }

    const clearMessages =() => {
      sendData(["clear"]);
    };

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
    return (<ChatContext.Provider
      value={{
        status, me, signedIn, messages, setMe, setSignedIn,
        sendMessage, clearMessages, displayStatus
      }}
      {...props}
      />
    );
    
};



const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
    