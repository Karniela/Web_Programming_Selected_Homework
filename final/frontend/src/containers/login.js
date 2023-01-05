import React, { useState, useEffect } from 'react'
import tony from '../videos/tony.mp4'
import woman from '../pictures/woman.png'
import '../css/homepage.css'
import Logo from '../components/logo'
import Navbar from '../components/navbar'
import '../css/login.css'
import SignInForm from '../components/signInForm'
import Chair from '../pictures/chair.jpg'
import { useAccount } from './hooks/useAccount'
import { useNavigate, useLocation } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const {setSignedIn, setUsername} = useAccount();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState(true)
    const handleSubmit = () => {
        //send to backend and wait for respond
        //if respond is not correct, setValid(false), else navigate and set signed in === true
        setSignedIn(true)
        setUsername("Jason") //等一下設成 user sign up 的時候的 First Name
        navigate('/collections')
    }

    return(
        <>
            <Navbar />
            <div className="gap"></div>
            <div className="gap"></div>
            <div className="body">
                <div className="chair">
                    <img src={Chair}></img>
                </div>
                <div className="form">
                    <SignInForm setEmail={setEmail} setPassword={setPassword} valid={valid} handleSubmit={handleSubmit} />
                </div>
            </div>
        </>    
    )
}

export default Login