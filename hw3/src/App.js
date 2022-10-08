import React from 'react';
import './App.css';
import Main from './container/main.js'
import Header from './container/header.js'
import Footer from './container/footer.js'


function App() {
  
  return (
    <div id = "appRoot" className="todo-app_root">
      <Header></Header>
      <Main></Main>
      
    </div>
  );
}

export default App;
