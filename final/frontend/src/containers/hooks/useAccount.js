import { createContext, useContext, useState, useEffect } from "react";

const AccountContext = createContext({
    signedIn: false,
    username: ""
})

const AccountProvider = (props) => {
    const [signedIn, setSignedIn] = useState(false);
    const [username, setUsername] = useState('');
    return(
        <AccountContext.Provider 
            value={{
                signedIn,
                setSignedIn,
                username,
                setUsername
            }}
            {...props}
        />
    )
}
const useAccount = () => useContext(AccountContext)

export {AccountProvider, useAccount};

