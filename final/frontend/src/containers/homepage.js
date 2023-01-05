import React, { useState, useEffect } from 'react'
import tony from '../videos/tony.mp4'
import woman from '../pictures/woman.png'
import Logo from '../components/logo'
import Navbar from '../components/navbar'
import '../css/homepage.css'
import '../css/featured.css'
import '../css/new.css'
import Artcard from '../components/artcard'
import example from '../pictures/example.jpg'
import { useNavigate, useLocation } from 'react-router-dom'
import { FEATURED_QUERY, NEWEST_QUERY } from '../graphql'
import { useQuery } from '@apollo/client'

const Homepage = () => {
    const navigate = useNavigate();

    const {data,loading} = useQuery(FEATURED_QUERY)
    
    const newest_result = useQuery(NEWEST_QUERY)

    const handleClick = (key) => {
        navigate(`/description/${key}`)
        console.log(key)
    }
    return(
        
        
        
        <div className="homepage">
        <header>
            <Navbar/>
            <div>
            <div id="intro" class="bg-image shadow-2-strong">
                <div class="container d-flex align-items-center justify-content-center text-center h-100">
                <div class="text-white">
                    <h1 class="mb-3">An artist is not paid for his labor but for his vision.</h1>
                    <h5 class="mb-4">Best art market analysis just for you.</h5>
                </div>
                </div>
            </div>
            </div>
        </header>

        <div className="gap"></div>

        <section class="text-center" className = "cardContainer">
          <h3 class="mb-5"className="featured-heading"><strong>FEATURED</strong></h3>
            <div class="row">   
            {data?.featured.map(({id,imgURL,title,artist}) => (
                        <Artcard picture={imgURL} title={title} painter={artist} key={id} id={id} handleClick={handleClick}/>
            ))} 
            </div>         
        </section>

        <div className="gap"></div>

        <section class="text-center" className = "cardContainer" >
          <h3 class="mb-5" className="new-heading"><strong>NEWEST</strong></h3>
            <div class="row">   
            {newest_result.data?.newest.map(({id,imgURL,title,artist}) => (
                        <Artcard picture={imgURL} title={title} painter={artist} key={id} id={id} handleClick={handleClick}/>
                    ))}
            </div>         
        </section>
            
        </div>     
    )
}

export default Homepage