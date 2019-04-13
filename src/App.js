import React, { Component, Suspense } from 'react';
//import './App.css';

import MiniDrawer from './MiniDrawer.js'
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import reducers from './reducers/index'


const store = createStore(
  reducers,
  applyMiddleware(logger)
  )

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      sideBarStatus: false
    };

    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(){
    this.setState({
      sideBarStatus:!this.state.sideBarStatus
    })
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router basename={'/react'}>
            <Suspense fallback={<div>Loading...</div>}>
              <MiniDrawer />
            </Suspense>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
