/****************************************************************************
  FileName      [ searchPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ display the search result ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/searchPage.css'
import { useNavigate, useLocation } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const SearchPage = () => {
    const { state } = useLocation();
    const [restaurants, setRestaurant] = useState([])
    const getRestaurant = async () => {

        // TODO Part I-3-b: get information of restaurants from DB
        try{
            const data = await instance.get('/getSearch', {params: {restaurants}})
            console.log('Succefully Searched');
            const contents = data.data.contents
            console.log(contents)
            
            setRestaurant(contents);
            
        }catch(error){ 
            console.log(error)
            throw new Error('Network Error(HTTP:500)! Contact the server owner');}
        
    }

    useEffect(() => {
        getRestaurant()
    }, [state.priceFilter, state.mealFilter, state.typeFilter, state.sortBy])


    const navigate = useNavigate();
    const ToRestaurant = (id) => {
        // TODO Part III-1: navigate the user to restaurant page with the corresponding id
        console.log("Go to restaurant")
        console.log(id)
        navigate(`/restaurant/${id}`);
    }
    const getPrice = (price) => {
        let priceText = ""
        for (let i = 0; i < price; i++)
            priceText += "$"
        return (priceText)
    }

    return (

        <div className='searchPageContainer'>
            {
                restaurants.map((item) => (
                    <>
                    <div className='resBlock' id={item.id} key={item.id} onClick={() => ToRestaurant(item.id)}>
                        <div className='resImgContainer' >
                            <img className='resImg' src={item.img}/>
                        </div>
                        <div className='resInfo'>
                            <div className='title'>
                                <p className='name'>{item.name}</p>
                                <p className='price'>{getPrice(item.price)}</p>
                                <p className='distance'>{item.distance/1000} km</p>
                            </div>
                                <p className='description'>{item.tag.map((i, index)=> <span>{i}{index < item.tag.length - 1 ? ", " : ""}</span>)}</p>
                        </div>
                    </div>
                    </>
                ))
            }
        </div>
    )
}
export default SearchPage