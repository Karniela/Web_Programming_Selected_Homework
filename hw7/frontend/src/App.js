import { useState, useEffect } from 'react'
import styled from 'styled-components';
import ChatRoom from './containers/ChatRoom';
import SignIn from './containers/SignIn';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`;
const App = () => {
    const { status, signedIn, displayStatus } = useChat()
    useEffect(() => {
    displayStatus(status)}, [status, displayStatus])
    
    return (
    <Wrapper> {signedIn? <ChatRoom />: <SignIn />} </Wrapper>
)}