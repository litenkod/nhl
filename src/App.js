import React, { Component } from 'react';
// import './App.scss';
import './styles/core.scss'
import { MainPage } from './components/MainPage';



class App extends Component {
  render() {
    return (
      <div className="App">
        <MainPage/>
      </div>
    );
  }
}

export default App;

// import logo from './logo.svg';
/* <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header> */