import React, { useState, useEffect } from 'react'
import tony from '../videos/tony.mp4'
import woman from '../pictures/woman.png'
import '../css/homepage.css'
import Logo from '../components/logo'
import Navbar from '../components/navbar'
import '../css/collections.css'
import flower from '../pictures/flower.jpg'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useAccount } from './hooks/useAccount'
import example from '../pictures/example.jpg'
import '../css/description.css'
import { SINGLE_ARWORK_QUERY } from '../graphql'
import { useQuery } from '@apollo/client'

const Description = () => {
    const { id } = useParams() //get the id from the parameter of link
    //query artworks by id (backend's part)
    //here I use example result 

    const {data,loading} = useQuery(SINGLE_ARWORK_QUERY,{variables:{id:id}})

    
    return (
        loading? <p>Loading</p> : 
        <>
            <Navbar />
            <div class="row">
                <h2>{data?.artwork.title}</h2>
                <div class="col-md-6 how-img">
                    
                    <img src={data?.artwork.imgURL} class="img-fluid hover-shadow" />
                </div>
                <div class="col-md-6"> 
                <table class="table">
                <tbody>
                <tr>
                    <th>Creator</th>
                    <td>{data?.artwork.artist}</td>
                </tr>
                <tr>
                    <th>Auction Date</th>
                    <td>{data?.artwork.auction_date}</td>
                </tr>
                <tr>
                    <th>Price</th>
          	        <td>{data?.artwork.price}</td>
                </tr>
                <tr>
                    <th>Material</th>
          	        <td>{data?.artwork.material}</td>
                </tr>
                <tr>
                    <th>Size</th>
          	        <td>{data?.artwork.dimension}</td>
                </tr>
                <tr>
                    <th>Auction Hous</th>
          	        <td>{data?.artwork.auction_house}</td>
                </tr>
                <tr>
                    <th>Area</th>
          	        <td>{data?.artwork.area}</td>
                </tr>
                <tr>
                    <th>Price Centimeter</th>
          	        <td>{data?.artwork.priceCentimeter}</td>
                </tr>
                </tbody>
                </table>
                    
                </div>
            </div>
            
        </>   
    )
}

export default Description;