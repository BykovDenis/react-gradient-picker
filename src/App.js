import React, { Component } from 'react';
import logo from './logo.svg';
import GradientPicker from './container/gradient-picker';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title"> React component. Gradient picker </h1>
        </header>
        <div className="App-gradient-panel" >
          <GradientPicker />
        </div>
      </div>
    );
  }
}

export default App;
