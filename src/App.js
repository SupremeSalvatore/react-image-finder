import React, { Component, Fragment } from 'react';

import Navbar from './components/Navbar/Navbar';
import Search from './components/Search/Search';

import './App.css';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Search />
      </Fragment>
    );
  }
}

export default App;
