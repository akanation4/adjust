import './App.css';
import Login from './Login';
import Room from './Room';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {

  import { useParams } from "react-router-dom";

  const RoomPage = () => {
  
      let { pass } = useParams();
  
      return (
          <div>
              <h1>部屋パスワード: {pass}</h1>
          </div>
      );
  };

  const RoomLinks = () => {
    const rooms = [];
    for (let i = 0; i < 10000; i++) {
      const room = i.toString().padStart(4, '0');
      rooms.push(
        <li key={room}>
          <Link to={`/room/pass=${room}`}>部屋{room}</Link>
        </li>
      );
    }
    return <ul>{rooms}</ul>;
  };
  return(
    // <div>
    //   <Login />
    // </div>
    <Router>
      
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/auth_code" element={<Login />} />
        <Route path="/room" element={<Room />} />
        <Route path="room/pass=:pass(\d[4])" element={RoomPage} />
      </Routes>
    </Router>
  );

} export default App;