import React, { useState } from 'react';
import x from './x.png';

function Item({items}){

    return(
        //https://jasonwatmore.com/post/2020/09/13/react-display-a-list-of-items
        //Display items in main
        <>
        {items.map((item) => (
            <li className="todo-app__item" key={ item.id }>
                <div  className="todo-app__checkbox" id = {item.id}>
                    <input type="checkbox" id = {item.id} label = {item.id}></input>
                </div>    
                <h1 className="todo-app__item-detail">{item.itemName}</h1>
                <img className="todo-app__item-x" src={x}></img>    
            </li>
        ))
        }
        
        
        
        </>
    )

}
export default Item;