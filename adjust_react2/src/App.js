import React from 'react';
import './App.css';
import Login from './Login';
import Room from './Room';
import RoomPage from './RoomPage';
import Adjustment from './Adjustment';
import AlertPage from './AlertPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return( 
    <Router>  
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/auth_code" element={<Login />} />
        <Route path="/room" element={<Room />} />
        <Route path="/adjust" element={<RoomPage />} />
        <Route path="/adjustment" element={<Adjustment />} />
        <Route path="/*" element={<AlertPage />} />
      </Routes>
    </Router>
  );

} export default App;