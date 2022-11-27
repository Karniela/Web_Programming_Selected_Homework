import LogIn from '../components/LogIn.js'
import {useChat} from './hooks/useChat.js';
import Title from '../components/Title.js'
import styled from 'styled-components';



const AppTitle = styled.div`
display: flex;
align-items: center;
justify-content: center;
h1 {
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
}
`;

const SignIn = () => {
    const { me, setMe, setSignedIn, displayStatus } = useChat();
    const handleLogin = (name) => {
        if (!name)
    displayStatus({
      type: "error",
      msg: "Missing user name",
    });
    else setSignedIn(true);
    }
    return (
    <>
        <AppTitle><h1>My Chat Room</h1></AppTitle>
        <LogIn me={me} setName={setMe} onLogin={handleLogin} />
    </>
    );
}
export default SignIn;