import { useState } from "react";
const client = new WebSocket ('ws://localhost:4000')

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState({});

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

    return {status, messages, sendMessage, clearMessages};

  
};
export default useChat;
    