import React from 'react';
import './styles.css';
import Main from './containers/main.js'
import Header from './containers/header.js'
import Footer from './containers/footer.js'


function App() {
  return (
    <div id = "appRoot" className="todo-app_root">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
