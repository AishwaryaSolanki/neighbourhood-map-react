import React, { Component } from 'react';
import MapList from './MapList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>HELLO WORLD!</p>
          <MapList/>
        </header>
      </div>
    );
  }
}

export default App;
