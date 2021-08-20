
import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import Iframejitsi from './iframe-jitsi';
import Iframemeetframe from './iframe-meet';
import JitsiComponent from './apps';

class App extends Component {

    render() {
        return (
        <Router>
          <Route exact path="/">
            <Iframejitsi />
          </Route>
          <Route exact path="/phoenix/:meetid/:name">
            <JitsiComponent />
          </Route>
        </Router>
       
            )
    
}
}

export default App;