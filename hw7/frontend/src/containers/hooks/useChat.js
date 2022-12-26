import { useEffect, useState, createContext, useContext } from "react";
import { message } from "antd";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext(
{
    status: {},
    me: "",
    singedIn: false,
    messages: [],
    startChat: () => {},
    sendMessage: () => {},
    clearMessages: () => {},
});
    
const client = new WebSocket("ws://localhost:4000");

const ChatProvider = (props) => {
    
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [singedIn, setSignedIn] = useState(false);
    const [me, setMe] = useState(savedMe || "");

    const displayStatus = (s) => {
        if (s.msg) {
          const { type, msg } = s;
          const content = {
            content: msg, duration: 2 }
          switch (type) {
            case 'success':
                message.success(content)
                break;
            case 'error':
            default:
                message.error(content)
                break;
    }}}

    const startChat = (name, to) => {
        if (!name || !to) throw new Error("Name and To are required.");

        sendData({
            type: "CHAT",
            payload: { name, to },
        });
    };

    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };
    const clearMessages = () => {
        sendData(["clear"]);
    };
    const sendMessage = (name, to, body) => {
        if (!name || !to || !body) 
            throw new Error("Name, To, and Body are required.");
        sendData({
            type: "MESSAGE",
            payload: { name, to, body },
        });
    };

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        console.log(task, payload);
        switch (task) {
            case "output": {
                setMessages(payload);
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            case "init": {
                setMessages(payload);
                break;
            }
            case "cleared": {
                setMessages([]);
                break;
            }
            default: break;
        }
    };
    useEffect(() => {
        if (singedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [singedIn]);

    useEffect(() => {
        displayStatus(status);
    }, [status]);

    return (
        <ChatContext.Provider
            value={{
                status,
                me,
                singedIn,
                messages,
                startChat,
                setMe,
                setSignedIn,
                sendMessage,
                clearMessages,
                displayStatus
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };