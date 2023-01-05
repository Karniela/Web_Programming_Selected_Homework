import React, { useState, useEffect } from 'react'
import tony from '../videos/tony.mp4'
import './plotly.js'
import woman from '../pictures/woman.png'
import '../css/homepage.css'
import Logo from '../components/logo'
import Navbar from '../components/navbar'
import '../css/collections.css'
import flower from '../pictures/flower.jpg'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useAccount } from './hooks/useAccount'
import example from '../pictures/example.jpg'

import { SINGLE_ARTIST_QUERY } from '../graphql'
import { useQuery } from '@apollo/client'
import Plotly from 'plotly.js-dist';



const Artist = () => {
    const { id } = useParams() //get the id from the parameter of link
    //query artworks by id (backend's part)
    //here I use example result 

    const {data,loading} = useQuery(SINGLE_ARTIST_QUERY,{variables:{id:id}})
    
    return (
        loading? <p>Loading</p> : 
        <>
            <Navbar />
            <div class="row">
            <h2>{data?.artist.name}</h2>
                <div class="col-md-6 how-img">
                    <img src={data?.artist.imgURL} class="img-fluid hover-shadow" />
                </div>
                <div class="col-md-6"> 
                <p>{data?.artist.description}</p>
                </div>
            </div>
            
        </>   
    )
}

export default Artist;