import { useState } from "react";
const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    
    const client = new WebSocket

    const sendData = async (data) => {
        await client.send(
        JSON.stringify(data));
    };

    const sendMessage = (payload) => {
        setMessages()
    console.log(payload);
    sendData(["input", payload]);
    }
    return {
    status, messages, sendMessage
  };
};
    export default useChat;
    