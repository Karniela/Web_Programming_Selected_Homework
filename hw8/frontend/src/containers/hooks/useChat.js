import { useQuery, useMutation } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION,MESSAGE_SUBSCRIPTION } from "../../graphql";
import { createContext, useContext, useState, useEffect } from "react";
import {message} from "antd";

const client = new WebSocket('ws://localhost:4000');

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
    status: {},
    me: "",
    signedIn: false,
    message: [],
    sendMessage: () => {},
    clearMessages: () => {},
    displayStatus: () => {},
    startChat: () => {} 
});

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);

    const { data, loading, subscribeToMore }
    = useQuery(CHATBOX_QUERY, {
      variables: {
        name1: me,
        name2: friend,
    }, });

    client.onmessage = (byteString) => {
         const { data } = byteString;
         const [task, payload] = JSON.parse(data);
         switch (task) {
             case "chatinit": {
                 setMessages(payload);
                 break;}
             case "output": {
                 setMessages(() => [...messages, payload]); 
                 break; }
             case "status": {
                 setStatus(payload); 
                 break;}
             case "cleared": {
                 setMessages([]);
                 break;
             }
             default: break;
         }
     }
     const displayStatus = (s) => {
         if (s.msg) {
           const { type, msg } = s;
           const content = {
             content: msg, duration: 0.8 }
           switch (type) {
             case 'success':
               message.success(content)
               break
             case 'error':
             default:
               message.error(content)
               break
       }}}

    const startChat = (name, to) => {
        if(!name || !to) throw new Error("name or to required");
        
        sendData({
            type: "CHAT",
            payload: {name, to},
        })
        

    }
    const sendData = async (data) => {
        client.send(JSON.stringify(data));
    };
    const sendMessage = (name, to, body) => {
        if(!name || !to || !body) {
            throw new Error("name to or body required");
        }
        sendData({
            type: "MESSAGE",
            payload: {name, to, body}
        });
    }
    
    const clearMessages = () => {
        sendData(["clear"]);
    };

     useEffect(() => {
        if(signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
     }, [signedIn])

     return (
        <ChatContext.Provider
            value = {{
                status, 
                messages, 
                me, 
                signedIn, 
                setMe, 
                setSignedIn, 
                sendMessage, 
                clearMessages, 
                displayStatus,
                startChat
            }}
            {...props}
        />
     ); 
}

const useChat = () => useContext(ChatContext);


export {ChatProvider, useChat};