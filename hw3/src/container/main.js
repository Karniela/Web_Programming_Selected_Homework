import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';
import x from '../components/x.png';


function Main(){
    // Initialize the textbox 
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [totalItemCount, setTotalItemCount] = useState(0);
    const [showFooter, setShowFooter] = useState(false);
    

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
            checkListEmpty(items);
        }   
    }
    


    
    
   //Handle checkbox checked
   const handleChange = (event) =>{
    var detailText = event.nextElementSibling.parentElement.nextElementSibling;
    const itemIndex = event.id;
    console.log(event);
    if (event.checked) {
        items[itemIndex].isSelected = true;
        detailText.style = 'text-decoration: line-through; opacity: 0.5';
        
        console.log(items);
 
      } else {
        items[itemIndex].isSelected = false;
        detailText.style = 'text-decoration: none; opacity: 1';
        console.log(items);
        }
}
    //Check list empty
    const checkListEmpty = (todos) => {
        
        if (todos.length === 0){ 
            setShowFooter(false);
        }else{
            setShowFooter(true);
        }
    }
    


    //Filter todo items
    const filterTodo = (todos) => {
        let todoItem = todos.filter(todo => !todo.isSelected);
        return todoItem
    }

    const countTodo = (todos) =>{
        let todoItem = filterTodo(todos);
        return todoItem.length
    }







    //Mapping the items
    const allItems = items.map(item => (
        <li className="todo-app__item" key={ item.id }>
        <div  className="todo-app__checkbox">
        <input type = "checkbox" id = {item.id} onChange={(event) => handleChange(event.target)}></input>
        <label htmlFor={item.id}></label>
        
        </div>    
        <h1 className="todo-app__item-detail">{item.itemName}</h1>
        <img className="todo-app__item-x" src={x}></img>    
        </li>)
        
    );
    
    return(
        <>
       <section className="todo-app__main">
                <input className="todo-app__input" value = {inputValue} onChange={(event) => setInputValue(event.target.value)} onKeyPress = {enterItem} placeholder = 'What needs to be done?'/>
                <ul className="todo-app__list" id="todo-list">
                {allItems}
                </ul>
        </section>
        {showFooter && <Footer text = {`${countTodo(items)} left`} id = 'footer'/>}
        </>
    );
}

export default Main;