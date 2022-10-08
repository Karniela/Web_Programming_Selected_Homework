import React, { useState } from 'react';
import Header from './header';

import Footer from './footer';
import Item from '../components/item.js';



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
            //console.log(items.id);
            let todoList = filterTodo(newItems);
            console.log(todoList);
        }   
    }

    const filterTodo = (todos) => {
        let todoItem = todos.filter(todo => !todo.isSelected);
        return todoItem
    }

    const countTodo = (todos) =>{
        let todoItem = filterTodo(todos);
        return todoItem.length
    }
    return(
        <>
       <section className="todo-app__main">
                <input className="todo-app__input" value = {inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyPress = {enterItem} placeholder = 'What needs to be done?'/>
                <ul className="todo-app__list" id="todo-list">
                <Item items={items}/>
                </ul>
        </section>
        <Footer text = {`${countTodo(items)} left`} />
        </>
    );
}

export default Main;