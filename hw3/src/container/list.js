import React, { useState } from 'react';
import Item from '../components/item.js';

function List({items}){
    return(
        <ul className="todo-app__list" id="todo-list">
            <Item items={items}/>
        </ul>
    )
}

export default List;