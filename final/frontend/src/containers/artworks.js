import React, { useState, useEffect } from 'react'
import tony from '../videos/tony.mp4'
import woman from '../pictures/woman.png'
import '../css/homepage.css'
import Logo from '../components/logo'
import Navbar from '../components/navbar'
import '../css/artworks.css'
import example from '../pictures/example.jpg'
import Artcard from '../components/artcard'
import { useNavigate, useLocation } from 'react-router-dom'
import { ARTWORKS_QUERY } from '../graphql'
import { useQuery } from '@apollo/client'

const Artworks = () => {
    const navigate = useNavigate();
    const {data,loading} = useQuery(ARTWORKS_QUERY,{variables:{input:""}})
    

    

    const handleClick = (key) => {
        navigate(`/description/${key}`)
        console.log(key)
    }
    return(
        loading? <p>Loading</p> : 
        <>

            <Navbar />
            <div className="gap"></div>
            <section class="text-center" >
            <h3 class="mb-5"className="featured-heading"><strong>All Artwork</strong></h3>
            <div className="gap"></div>
            <div class="row">   
            {data?.artworks.map(({id,imgURL,title,artist}) => (
                 <Artcard picture={imgURL} title={title} painter={artist} key={id} id={id} handleClick={handleClick} />
            ))}    
            </div>         
        </section>
        </>    
    )
}

export default Artworks