import React, { useState } from 'react';
import List from './list';


function Main(){
    // Initialize the textbox 
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [totalItemCount, setTotalItemCount] = useState(0);
    
    
    const enterItem = (event) => {
        if (event.key === 'Enter'){
            const newItem = {
                id:totalItemCount,
                itemName: inputValue,
                isSelected:false,
            }
            const newItems = [...items, newItem];
            const newTotalItemCount = totalItemCount+1;
            
            setItems(newItems);
            setTotalItemCount(newTotalItemCount);
            setInputValue('');
            console.log(items.id);
        }   
    }



    return(
       <section className="todo-app__main">
                <input className="todo-app__input" value = {inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyPress = {enterItem} placeholder = 'What needs to be done?'/>
                <List items = {items}/>
        </section>
    )
}

export default Main;