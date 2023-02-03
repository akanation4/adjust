import './App.css';
import Login from './Login';
import Room from './Room';
import RoomPage from './RoomPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

function App() {
  return(    
    <Router>  
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/auth_code" element={<Login />} />
        <Route path="/room" element={<Room />} >
          <Route path="/room/pass=:pass(\d[4])" element={<RoomPage />} />
        </Route>
      </Routes>
    </Router>
  );

} export default App;