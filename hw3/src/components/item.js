import React, { useState } from 'react';
import x from './x.png';

function Item({items}){

    return(
        //Render List
        //https://jasonwatmore.com/post/2020/09/13/react-display-a-list-of-items
        //Display items in main
        //Checkbox setup
        //https://www.vialley.com/528/%E7%AD%86%E8%A8%98%EF%BC%9Areact%E8%A1%A8%E5%96%AE%E4%B8%ADinput%E7%9A%84-radio-checkbox-%E7%9A%84%E4%BD%BF%E7%94%A8
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