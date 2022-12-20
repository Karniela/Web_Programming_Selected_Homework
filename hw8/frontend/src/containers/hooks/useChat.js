import { useEffect, useState, createContext, useContext } from "react";
import { message } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION,MESSAGE_SUBSCRIPTION } from "../../graphql";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext(
{
    status: {},
    me: "",
    singedIn: false,
    messages: [],
    startChat: () => {},
});
    


const ChatProvider = (props) => {
    
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [singedIn, setSignedIn] = useState(false);
    const [me, setMe] = useState(savedMe || "");
    const [friend, setFriend] = useState("");

    const { data, loading, subscribeToMore }
    = useQuery(CHATBOX_QUERY, {
      variables: {
        name1: me,
        name2: friend,
    }, });

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);

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
                
                setMe,
                setSignedIn,
                startChat,
                displayStatus
            }}
            {...props}
        />
    );
};

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };