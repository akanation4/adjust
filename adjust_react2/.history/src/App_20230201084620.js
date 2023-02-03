import React, { useEffect } from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from './Login';
import Room from './Room';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
    return(
        <div>
            <Login />
        </div>
    // <Router>
    //     <Routes>
    //         <Route exact path="/">
    //             <Login />
    //         </Route>
    //     </Routes>
    // </Router>
    );

} export default App;