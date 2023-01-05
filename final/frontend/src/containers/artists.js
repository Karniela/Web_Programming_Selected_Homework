import React, { useState, useEffect } from 'react'
import tony from '../videos/tony.mp4'
import woman from '../pictures/woman.png'
import '../css/homepage.css'
import Logo from '../components/logo'
import Navbar from '../components/navbar'
import '../css/artists.css'
import example from '../pictures/example.jpg'
import Artistcard from '../components/artistcard'
import { useNavigate, useLocation } from 'react-router-dom'
import { ARTISTS_QUERY } from '../graphql'
import { useQuery } from '@apollo/client'

const Artists = () => {
    const navigate = useNavigate();
    const toArtist = (id) => {
        navigate(`/artist/${id}`)
        console.log(id)
    }

    

    const {data,loading} = useQuery(ARTISTS_QUERY,{variables:{input:""}})
    
    return(
        loading?<p>Loading</p>:
        <>
            <Navbar />
            
            <div className="gap"></div>
            <section class="text-center" >
            <h3 class="mb-5"className="featured-heading"><strong>All Artists</strong></h3>
            <div className="gap"></div>
            <div class="row">   
            {data?.artists.map(({id,imgURL,name}) => (
                    <Artistcard picture={imgURL} name={name} key={id} id={id} toArtist={toArtist} />
                ))}  
            </div>         
        </section>
        </>    
    )
}

export default Artists