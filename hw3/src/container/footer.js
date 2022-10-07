//This is the footer of this app.

function Footer(){
    return(
        <footer className = "todo-app__footer" id= "todo-footer"> 
            <div className="todo-app__total">0 left</div>
            <ul className="todo-app__view-buttons">
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </ul>
            <div className="todo-app__clean">
                <button>Clear completed</button>
            </div>
        </footer>
    )
}

export default Footer;