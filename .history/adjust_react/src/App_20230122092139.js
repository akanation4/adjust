import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
im
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
    return(
        <QueryClientProvider client={queryClient}>
            <Authorized  unauthorized={<Unauthorized />}>
                <UserInfo />
                <SignOut />
            </Authorized>
        </QueryClientProvider>
    );

}

export default App;