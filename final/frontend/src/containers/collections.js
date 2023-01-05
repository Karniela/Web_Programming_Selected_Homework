import React, { useState, useEffect } from 'react'
import tony from '../videos/tony.mp4'
import woman from '../pictures/woman.png'
import '../css/homepage.css'
import Logo from '../components/logo'
import Navbar from '../components/navbar'
import '../css/collections.css'
import flower from '../pictures/flower.jpg'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAccount } from './hooks/useAccount'

const Collections = () => {
    const navigate = useNavigate();
    const [myCollection, setMyCollection] = useState([])
    const {signedIn, username, setUsername} = useAccount();
    const Before = () => ( //如果還沒登入過
        <>
            <Navbar />
            <div className = "head-text">
                <div className = "head-image">
                    <img src = {flower} alt = "Freedom Blog" />
                </div>
                <div className="text" style={{fontSize:'1em'}}>
                    <h1 onClick={() => {navigate('/signup')}}>Sign Up to become a part of us !</h1>
                    <br></br>
                    <h3 onClick={() => {navigate('/login')}}>Already have an account ? Sign In here !</h3>
                </div>
            </div>
        </> 
    )
    const After = () => ( //登入過後
        <>
            <Navbar />
            <h1>{`${username}'s Studio`}</h1>
        </>
    )
    return(
        signedIn? <After /> : <Before />
    )
}

export default Collections