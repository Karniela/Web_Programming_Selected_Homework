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
            checkListEmpty(newItems);
        }   
    }
    
    
   //Handle checkbox checked
   const handleChange = (event) =>{
    var detailText = event.nextElementSibling.parentElement.nextElementSibling;
    const itemIndex = event.id;
    if (event.checked) {
        items[itemIndex].isSelected = true;
        detailText.style = 'text-decoration: line-through; opacity: 0.5';
      } else {
        items[itemIndex].isSelected = false;
        detailText.style = 'text-decoration: none; opacity: 1';
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
    
    //Delete todo item (x)
    //https://www.robinwieruch.de/react-remove-item-from-list/
    const handleDelete = (id) =>{
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
        checkListEmpty(newItems);

    }

    //Filter completed items
    function filterCompleted(){
        let completedItem = items.filter((item) => item.isSelected === true);
        let todoList = document.getElementsByClassName("todo-app__item");
        let todoLength = todoList.length;
        for(let i = 0; i < todoLength; i++) {
        for(let j = 0; j < completedItem.length; j++) {
            if(completedItem[j].id == todoList[i].firstChild.firstChild.id){
                todoList[i].style.display = '';
                break
            }else{
                todoList[i].style.display = 'none';
            }
        }}
        console.log(completedItem);
    }

    //Filter active items
   function filterTodo(){
        let todoItem = items.filter((item) => item.isSelected !== true);
        let todoList = document.getElementsByClassName("todo-app__item");
        let todoLength = todoList.length;
        for(let i = 0; i < todoLength; i++) {
        for(let j = 0; j < todoItem.length; j++) {
            if(todoItem[j].id == todoList[i].firstChild.firstChild.id){
                todoList[i].style.display = '';
                break
            }else{
                todoList[i].style.display = 'none';
            }
        }}
        console.log(todoList);
    
    }

    function countTodo(todos){
        let todoItem = items.filter((item) => item.isSelected !== true);
        return todoItem.length
    }
    
    //Filter all items
    function filterAll(){
        let allItem = items;
        let todoList = document.getElementsByClassName("todo-app__item");
        for(let i = 0; i < allItem.length; i++) {
            todoList[i].style.display = '';
        }
        console.log(allItem);
        
    }

    //Mapping the items
    const allItems = items.map(item => (
        <li className="todo-app__item" key={ item.id }>
        <div  className="todo-app__checkbox">
        <input type = "checkbox" id = {item.id} onChange={(event) => handleChange(event.target)}></input>
        <label htmlFor={item.id}></label>
        
        </div>    
        <h1 className="todo-app__item-detail">{item.itemName}</h1>
        <img className="todo-app__item-x" src={x} onClick = {() => handleDelete(item.id)}></img>    
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
        {showFooter && 
                    <Footer 
                    text = {`${countTodo(items)} left`} 
                    id = 'footer'
                    filterCompleted = {filterCompleted}
                    filterTodo = {filterTodo}
                    filterAll = {filterAll}
                    />  
                   
        }
        </>
    );
}

export default Main;