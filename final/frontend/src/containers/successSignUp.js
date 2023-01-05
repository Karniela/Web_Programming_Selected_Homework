import book from '../pictures/books.jpg'
import Logo from '../components/logo'
import '../css/successSignUp.css'
import { useNavigate, useLocation } from 'react-router-dom'

const SuccessSignUp = () => {
    const navigate = useNavigate();
    const backToHome = () => {
        navigate('/')
    }
    return (
        <div className = "head-text">
            <div className = "head-image">
              <img src = {book} alt = "Freedom Blog" />
            </div>
            <div className="text" style={{fontSize:'1.75em'}}>
              <h1>Registration Successful!</h1>
              <h3>Thank you for being a part of us</h3>
              <p onClick={backToHome}>Start explore our collections</p>
            </div>
        </div>
    )
}


export default SuccessSignUp