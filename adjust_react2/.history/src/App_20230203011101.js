import './App.css';
import Login from './Login';
import Room from './Room';
import RoomPage from './RoomPage';
import JoinRoom from './JoinRoom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createStore}

const store =

function App() {
  return(    
    <Router>  
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/auth_code" element={<Login />} />
        <Route path="/room" element={<Room />} />
        <Route path="/room/adjust" element={<JoinRoom />} />
      </Routes>
    </Router>
  );

} export default App;