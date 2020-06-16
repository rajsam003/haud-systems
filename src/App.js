import React, { Component } from 'react';
import './App.css';
import UserDetails from './container/UserDetails';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Haud Systems Malta</h1>
        <div className="Content">
          <UserDetails />
        </div>
      </div>
    )
  }

}

export default App;
