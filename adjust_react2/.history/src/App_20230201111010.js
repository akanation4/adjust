import React from 'react';
import './App.css';
import Login from './Login';
import Room from './Room';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return(
        // <div>
        //     <Login />
        // </div>
    <Router>
      <Routes>
        <Route exact path=`/`>
          <Login />
        </Route>
        <Route path=`/room`>
          <Room />
        </Route>
    </Routes>
    </Router>
    );

} export default App;