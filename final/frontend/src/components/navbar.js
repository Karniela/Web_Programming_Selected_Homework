import Logo from "./logo"
import '../css/navbar.css'
import { Input, Tag, message} from 'antd'
import { NavLink, Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom'

const { Search } = Input;


const Navbar = () => {
    const navigate = useNavigate();
    const navigateTo = (e) => {
        const pages = e.target.className;
        navigate(`/${pages}`);
    }
    const backToHome = () => {
        navigate('/')
    }
    return(
        /*<div className="navbar navbar-expand-md">
            <div className="left-navbar">
                <div className="logo-container" onClick={backToHome}>
                    <Logo/>
                </div>
                
            </div>
            <div className="right-navbar">
                <div className="collections" onClick={navigateTo}>MY COLLECTIONS</div>
                <div className="artists" onClick={navigateTo}>ARTISTS</div>
                <div className="artworks" onClick={navigateTo}>ARTWORKS</div>
                <div className="signup" onClick={navigateTo}>BECOME A MEMBER</div>
                <div className="login" onClick={navigateTo}>LOGIN</div>
            </div>
        </div>*/
        <nav class="navbar navbar-expand-md">
        <a class="navbar-brand" className="logo-container" onClick={backToHome}><Logo/></a>
        <div className="search">
                <Search className="search-text"
                    placeholder="Search for artists or artworks..."
                    allowClear
                    style={{
                        width: '300px',
                    }}
                >
                </Search>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="main-navigation">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <div class="nav-link" className="collections" onClick={navigateTo} >MY COLLECTIONS</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link" className="artists" onClick={navigateTo}>ARTISTS</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link" className="artworks" onClick={navigateTo}>ARTWORKS</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link" className="signup" onClick={navigateTo}>SIGN UP</div>
                </li>
                <li class="nav-item">
                    <div class="nav-link" className="login" onClick={navigateTo}>LOGIN</div>
                </li>
            </ul>
        </div>
        </nav>
    

    )
}
export default Navbar