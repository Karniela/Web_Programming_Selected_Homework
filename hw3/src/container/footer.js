//This is the footer of this app.

function Footer(item){
    
    return(
        <footer className = "todo-app__footer" id= "todo-footer" > 
            <div className="todo-app__total">{item.text}</div>
            <ul className="todo-app__view-buttons">
                <button onClick = {() => item.filterAll(item)}>All</button>
                <button onClick = {() => item.filterTodo(item)}>Active</button>
                <button onClick = {() => item.filterCompleted(item)}>Completed</button>
            </ul>
            {item.showClear 
            ?(<div className="todo-app__clean">
                <button onClick = {() => item.clearCompleted(item)}>Clear completed</button>
            </div>)
            : null
            }
        </footer>
    )
}

export default Footer;